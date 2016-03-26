/**
 * Created by Sunil on 1/19/2016.
 */


$( document ).ready(function() {
    console.log( "ready!" );
    ga('send', 'pageview');
    enable();
});

function enable() {
    var inputDissabled = $( "input" ).attr( "disabled" );
    $('#enable').click(function() {
        var input = $( this ).next();

        if ( $('#enable').is(":checked") ) {
            $("#bike").removeAttr( "disabled" )
            $("#rikshaw").removeAttr( "disabled" )
            $("#city").removeAttr( "disabled" )
            $("#vehicleNumber").removeAttr( "disabled" )
            /$("#overlay").slideDown();
            //$("#overlay").show();

        } else {
            $("#bike").attr ( "disabled", "disabled" );
            $("#rikshaw").attr( "disabled", "disabled" );
            $("#city").attr ( "disabled", "disabled" );
            $("#vehicleNumber").attr( "disabled", "disabled" );
            $("#bike").attr('checked', false);
            $("#rikshaw").attr('checked', false);
            $("#city").removeClass ( "error" );
            $("#vehicleNumber").removeClass ( "error" );
            $("#overlay").slideUp();
            //$("#overlay").hide()
        }

        // $( "#log" ).html( "input title is now " + input.attr( "disabled" ) );
    });
};


function submitForm() {
    console.log($('#b47TT-betaInviteFrm').valid());

    if ($('#b47TT-betaInviteFrm').valid() && $('#enable').is(":checked") === false) {

        $('#submitbtn').attr("disabled", "disabled");
        $("#submitloader").show()

        var tmpObj = {
            "city": "",
            "name": $('#fullName').val(),
            "email": $('#useremail').val(),
            "phone": $('#usermobile').val(),
            "vehicleNumber": "",
            "vehicleType": ""
        }

        $.post("https://conflame.47billion.com/tuktuk/invite", tmpObj, function () {
            //alert( "success" );
        }).done(function () {
            //alert( "second success" );
        }).fail(function () {
            // alert( "error" );
            $('#submitbtn').removeAttr("disabled");
        }).always(function () {
            //alert( "finished" );
            ga('send', 'event', 'Form-Submit', "Submit","Form Submited",$('#usermobile').val());

            $('#submitbtn').removeAttr("disabled");
            $("#submitloader").hide()
            $('#seccessDiv').show()
            $('#driverform').hide();
            $('#b47TT-betaInviteFrm').hide();
        });
    }


// vehicle
// city
// vehicleNumber


    if ($('#enable').is(":checked") === true) {

        if($('input:radio[name=vehicle]:checked').val() === undefined)
        {
            $('.vehicle').addClass('error');
        }
        else
        {
            $('.vehicle').removeClass('error');
        }
        if ($('#driverform').valid() && $('#b47TT-betaInviteFrm').valid()) {
            $('#submitbtn').attr("disabled", "disabled");
            $("#submitloader").show()
            var tmpObj = {
                "city": $('#city').val(),
                "name": $('#fullName').val(),
                "email": $('#useremail').val(),
                "phone": $('#usermobile').val(),
                "vehicleNumber": $('#vehicleNumber').val(),
                "vehicleType": $('input:radio[name=vehicle]:checked').val()

            }

            $.post("https://conflame.47billion.com/tuktuk/invite", tmpObj, function () {
                //alert( "success" );
            }).done(function () {
                //alert( "second success" );
            }).fail(function () {
                //alert( "error" );
                $('#submitbtn').removeAttr("disabled");
            }).always(function () {
                // alert( "finished" );
                ga('send', 'event', 'Form-Submit', "Submit","Form Submited",$('#vehicleNumber').val());
                $('#submitbtn').removeAttr("disabled");
                $("#submitloader").hide()
                $('#seccessDiv').show();
                $('#driverform').hide();
                $('#b47TT-betaInviteFrm').hide();
            });
        }
    }
}

function isNumberKey(evt){
    var charCode = (evt.charCode) ? evt.charCode :  evt.keyCode
         // (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode ===8 || event.keyCode === 46'
    if ((charCode >= 48 && charCode <= 57) || charCode ===8 || charCode === 46)
        return true;
    return false;
}