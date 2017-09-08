  document.addEventListener("DOMContentLoaded", function(event) {

    let total = 0;

    //set the default payment method to credit card
    $('#payment').val('credit card');

    //hide the description of work box if 'other' is not selected
  	  function toggleJob() {
    	if(($('#title').val()) !== 'other') {
    		$('#other-title').hide();
    	} else {
    		$('#other-title').show();
    	}
      console.log('working');
    }

    //alter what info is shown based on the payment option
    function togglePayOptions() {
      if(($('#payment').val()) === 'paypal') {
    		$('#paypal').show();
      } else {
        $('#paypal').hide();
        console.log($('#payment').val());
      }
      if(($('#payment').val()) === 'credit card') {
        $('#credit-card').show();
      } else {
        $('#credit-card').hide();
      }
      if(($('#payment').val()) === 'bitcoin') {
        $('#bitcoin').show();
      } else {
        $('#bitcoin').hide();
      }
    }

    //change the colors available based on the tshit model selected
    function toggleColor() {
        if ($(this).val() === 'blank'){
            $("#color option").each(function(i){
                $(this).show();
            });

        }
        else if($('#design').val() === 'js puns') {
            $("#color option").each(function(i){
                if (i <= 2) {
                    $(this).show()
                } else ($(this).hide());
            });
        } else if ($('#design').val() === 'heart js'){

            $("#color option").each(function(i){
                if (i >= 3) {
                    $(this).show()
                } else ($(this).hide())
            });
        }
    }

    //disable activities that overlap whwne a competing activity is selected
    function checkActivities() {
      if ($('[name=express]').prop('checked')) {
        $('[name=js-frameworks]').attr('disabled', true);
      } else {
        $('[name=js-frameworks]').attr('disabled', false);
      }

      if ($('[name=js-frameworks]').prop('checked')) {
        $('[name=express]').attr('disabled', true);
      } else {
        $('[name=express]').attr('disabled', false);
      }

      if ($('[name=node]').prop('checked')) {
        $('[name=js-libs]').attr('disabled', true);
      } else {
        $('[name=js-libs]').attr('disabled', false);
      }

      if ($('[name=js-libs]').prop('checked')) {
        $('[name=node]').attr('disabled', true);
      } else {
        $('[name=node]').attr('disabled', false);
      }
    }

    //calculate a running total of cost of activities selected
    function totalCost() {
      total = 0;
      $(".activities label input").each(function(index, value) {
        //console.log($(this).attr('name'));
        if ($(this).prop('checked') && $(this).attr('name') === 'all') {
          total += 200;
        } else if ($(this).prop('checked')) {
          total += 100;
        }
      });
      $('#total').html("Total cost: " + total);
    }

    //regex for validating email format
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
}

    //validate form on submission
    $("form").submit(function(){
      let offSwitch = 0;
      let mail = $("#mail").val();

      if ($("#name").val() === "") {
        $("#name").css("border", "solid 1px red");
        offSwitch += 1;
      }

      if (!(validateEmail(mail))) {
        $("#mail").css("border", "solid 1px red");
        offSwitch += 1;
      }
      if (!($(".activities label input:checkbox:checked").length > 0)) {
        $(".activities label").css("border", "solid 1px red");
        offSwitch += 1;
      }

      if(($('#payment').val()) === 'credit card') {
        const number = $("#cc-num").val()
        const cvv = $("#cvv").val()
        const zip = $("#zip").val()

        if (!(number.length > 12 && number.length < 17 && isNumber(number))) {
          $("#cc-num").css("border", "solid 1px red");
          offSwitch += 1;
        }

        if (!(zip.length === 5 && isNumber(number))) {
          $("#cvv").css("border", "solid 1px red");
          offSwitch += 1;
        }

        if (!(cvv.length === 3 && isNumber(number))) {
          $("#zip").css("border", "solid 1px red");
          offSwitch += 1;
        }
      }

      if (offSwitch > 0) {
        console.log(offSwitch);
        return false
      }
    });

    //call functions defined above
    
    $( ".activities" ).append( "<p id='total'> Total cost: " + total + "</p>" );

    $(".activities label").change(totalCost);

    $(".activities label").change(checkActivities);

    $("#design").change(toggleColor);

    togglePayOptions();

    $("#payment").change(togglePayOptions);

    $("#name").focus();

    toggleJob();

    $("#title").change(toggleJob);

 });
