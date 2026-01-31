
$(function(){

    var data;
    var trip;
    var $invoker;

    // Load trips on page load
    getTrips();

    // Hide trip type sections initially
    $('.regular').hide();
    $('.oneoff').hide();
    $('.time').hide();

    // Toggle Regular / One-off
    $('input[name="regular"]').click(function(){
        if($(this).val()=="Y"){
            $('.oneoff').hide();
            $('.regular').show();
            $('.time').show(); 
        } else {
            $('.oneoff').show();
            $('.regular').hide(); 
            $('.time').show(); 
        }
    });

    // ================== ✅ CREATE TRIP ==================
    $('#addtripform').submit(function(event){
        event.preventDefault();
        $("#results").hide();
        $("#spinner").show();

        var data = $(this).serialize(); // SIMPLE FORM DATA

        $.ajax({
            url: "lib/addtrips.php",
            type: "POST",
            data: data,
            success: function(response){
                if(response){
                    $('#results').html(response).slideDown();
                } else {
                    getTrips();
                    $('#addtripModal').modal('hide');
                    $('#addtripform')[0].reset();
                }
                $("#spinner").hide();
            },
            error: function(){
                $("#results").html("<div class='alert alert-danger'>Ajax error. Try again.</div>").fadeIn();
                $("#spinner").hide();
            }
        });
    });

    // ================== LOAD USER TRIPS ==================
    function getTrips(){
        $("#spinner").show();
        $.ajax({
            url:"lib/gettrips.php",
            success: function(data){
                $("#spinner").hide();
                $('#mytrips').html(data).hide().fadeIn();
            },
            error: function(){
                $("#spinner").hide();
                $("#mytrips").html("<div class='alert alert-danger'>Error loading trips.</div>").fadeIn();
            }
        });
    }

    // ================== EDIT TRIP MODAL ==================
    $('.regular2').hide();
    $('.oneoff2').hide();
    $('.time2').hide();

    $('input[name="regular2"]').click(function(){
        if($(this).val()=="Y"){
            $('.oneoff2').hide();
            $('.regular2').show();
            $('.time2').show(); 
        } else {
            $('.oneoff2').show();
            $('.regular2').hide(); 
            $('.time2').show(); 
        }
    });

    $('#date,#date2').datepicker({
        showAnim:"fadeIn",
        numberOfMonth:1,
        dateFormat:"D d M,yy",
        minDate:+1,
        maxDate:"+12M"
    });

    $('#edittripModal').on('show.bs.modal',function(e){
        $('#result2').html("");
        $invoker = $(e.relatedTarget);

        $.ajax({
            url: "lib/gettripdetails.php",
            method: "POST",
            data: {trip_id:$invoker.data('trip_id')},
            success: function(data){
                trip = JSON.parse(data);
                formatModal();
            },
            error: function(){
                $('#result2').html("<div class='alert alert-danger'>Error loading trip details.</div>").fadeIn();
            }
        });
    });

    function formatModal(){
        $('#departure2').val(trip["departure"]);    
        $('#destination2').val(trip["destination"]); 
        $('#price2').val(trip["price"]);    
        $('#seatsavailable2').val(trip["seatsavailable"]);    

        if(trip["regular"] == "Y"){
            $('#yes2').prop('checked', true);
            $('.oneoff2').hide(); 
            $('.regular2').show();
            $('.time2').show();
        } else {
            $('#no2').prop('checked', true);
            $('.oneoff2').show();
            $('.regular2').hide();
            $('.time2').show();
        }
    }

    // ================== UPDATE TRIP ==================
    $('#edittripform').submit(function(event){
        event.preventDefault();
        $("#result2").hide();
        $("#spinner").show();

        var data = $(this).serialize();
        data += '&trip_id=' + $invoker.data('trip_id');

        $.ajax({
            url: "lib/updatetrips.php",
            type: "POST",
            data: data,
            success: function(response){
                if(response){
                    $('#result2').html(response).slideDown();
                } else {
                    getTrips();
                    $('#edittripModal').modal('hide');
                    $('#edittripform')[0].reset();
                }
                $("#spinner").hide();
            },
            error: function(){
                $("#result2").html("<div class='alert alert-danger'>Ajax error.</div>").fadeIn();
                $("#spinner").hide();
            }
        });
    });

    // ================== DELETE TRIP ==================
    $('#deletetrip').click(function(){
        $.ajax({
            url:"lib/deletetrips.php",
            method:"POST",
            data:{trip_id:$invoker.data('trip_id')},
            success:function(){
                $('#edittripModal').modal('hide');
                getTrips();
            },
            error:function(){
                $("#result2").html("<div class='alert alert-danger'>Delete failed.</div>").fadeIn();
            }
        });
    });

});








    //Ajax call for Search form Index.php

    $('#searchform').submit(function(event){
        //hide Message
        $("#result2").fadeOut()
        //show the spinner
        $("#spinner").css("display","block")
        //prevent deafault PHP processing
        event.preventDefault();
        //collect inputs from user
        data=$(this).serializeArray()
        console.log(data)
        getSearchTripDepartureCoordinates();
    })
    //function to get departure coordinates
    function getSearchTripDepartureCoordinates()
    {
        departureLat=olat;
        departureLng=olng;
        data.push({name:'departureLongitude',value:departureLng})
        data.push({name:'departureLatitude',value:departureLat})
        getSearchTripDestinationCoordinates();
    }
    //function to get destination coordinates
    function getSearchTripDestinationCoordinates()
    {
        destinationLat=dlat;
        destinationLng=dlng;
        data.push({name:'destinationLongitude',value:destinationLng})
        data.push({name:'destinationLatitude',value:destinationLat})
        submitSearchTripRequest();
    }
    //function to add Trip request
    function submitSearchTripRequest(){
        console.log(data);
        $.ajax({
            url: "lib/search.php",
            data: data,
            type: "POST",
            success: function(data2){
                console.log(data);
                if(data2){
                    $('#results').html(data2);
                    //accordion
                    $('#results').accordion({
                        header:'h4',
                        icons:false,
                        active:false,
                        collapsible:true,
                        hightStyle:"content"
                    })
                    $("#spinner").css("display", "none");
                    $("#results").slideDown();
                }
        },
            error: function(){
                $("#results").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
                $("#spinner").css("display", "none");
                $("#results").fadeIn();

    }
        }); 

    }


