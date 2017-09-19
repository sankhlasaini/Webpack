var borderSize = 0.5;
var noOfElement = 3;

$(document).ready(function () {
	var scrolledMapVertical = new Map();
	var scrolledMapHorizontal = new Map();

	for (let i = 0; i < $(".myCarouselVertical").length; i++) {
		var myId = $(".myCarouselVertical")[i].id;
		scrolledMapVertical.set(myId, 0);
	}
	for (let i = 0; i < $(".myCarouselHorizontal").length; i++) {
		var myId = $(".myCarouselHorizontal")[i].id;
		scrolledMapHorizontal.set(myId, 0);
	}

	// console.log($("#carouselID").height());
	// var varHeight = $("#carouselID").height();
	// // var varWidth = $("#carouselID").width();
	// $(".carouselImg").css("height", varHeight);

	// div height for large screen 
	// div width for small screen 	

	// for small screen left arrow
	$(".myCustomCarouselLeft").on("click", function () {
		functionalDiv = $("#" + $(this)[0].id).parent().next().children();
		var scrollDivWidth = (functionalDiv.width()) * 1;

		if (scrolledMapHorizontal.get(functionalDiv.parent()[0].id) > 0) {
			var scrolledLeft = scrolledMapHorizontal.get(functionalDiv.parent()[0].id) - scrollDivWidth - (borderSize * noOfElement);
			scrolledMapHorizontal.set(functionalDiv.parent()[0].id, scrolledLeft)
			functionalDiv.parent().animate({
				scrollLeft: scrolledLeft
			}, 350);
		}
	});

	// for small screen right arrow

	$(".myCustomCarouselRight").on("click", function () {
		functionalDiv = $('#' + $(this)[0].id).parent().prev().children();
		var scrolled = scrolledMapHorizontal.get(functionalDiv.parent()[0].id);
		var scrollDivWidth = (functionalDiv.width()) * 1;
		var scrollWidth = functionalDiv.parent().prop('scrollWidth');
		var divWidth = functionalDiv.parent().width();
		var scrollerEndPoint = scrollWidth - divWidth;
		if (scrolled < scrollerEndPoint) {
			scrolled = scrolled + scrollDivWidth + (borderSize * noOfElement);
			functionalDiv.parent().animate({
				scrollLeft: scrolled
			}, 350);
			scrolledMapHorizontal.set(functionalDiv.parent()[0].id, scrolled);
		}
	});


	// for large screen Up arrow

	$(".myCustomCarouselUp").on("click", function () {
		functionalDiv = $("#" + $(this)[0].id).parent().next().children();
		var scrollDivHeight = (functionalDiv.height()) * 1;
		if (scrolledMapVertical.get(functionalDiv.parent()[0].id) > 0) {
			var scrolledUp = scrolledMapVertical.get(functionalDiv.parent()[0].id) - scrollDivHeight - (borderSize * noOfElement);
			scrolledMapVertical.set(functionalDiv.parent()[0].id, scrolledUp);
			functionalDiv.parent().animate({
				scrollTop: scrolledUp
			}, 350);
		}
	});

	// for large screen down arrow

	// $("#typeSelectDownBtn").on("click", function () {

	$(".myCustomCarouselDown").on("click", function () {
		functionalDiv = $('#' + $(this)[0].id).parent().prev().children();
		var scrolled = scrolledMapVertical.get(functionalDiv.parent()[0].id);
		var scrollDivHeight = (functionalDiv.height()) * 1;
		var scrollHeight = functionalDiv.parent().prop('scrollHeight');
		var divHeight = functionalDiv.parent().height();
		var scrollerEndPoint = scrollHeight - divHeight;
		if (scrolled < scrollerEndPoint) {
			scrolled = scrolled + scrollDivHeight + (borderSize * noOfElement);
			functionalDiv.parent().animate({
				scrollTop: scrolled
			}, 350);
			scrolledMapVertical.set(functionalDiv.parent()[0].id, scrolled);
		}
	});
});
