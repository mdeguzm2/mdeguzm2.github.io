$(document).ready(function () {
    let slideIndex = 1;

    function showSlides(index) {
        let slides = $(".my-slides");
        let thumbnails = $(".demo");

        if (index > slides.length) {
            slideIndex = 1;
        }
        if (index < 1) {
            slideIndex = slides.length;
        }

        slides.hide(); // Hide all slides
        thumbnails.removeClass("active"); // Remove active class from all thumbnails

        $(slides[slideIndex - 1]).show(); // Show the current slide
        $(thumbnails[slideIndex - 1]).addClass("active"); // Mark the current thumbnail as active
    }

    $(".prev").click(function () {
        showSlides(slideIndex -= 1);
    });

    $(".next").click(function () {
        showSlides(slideIndex += 1);
    });

    $(".demo").click(function () {
        let clickedSlide = $(this).data("slide");
        slideIndex = clickedSlide;
        showSlides(slideIndex);
    });

    showSlides(slideIndex);
});
