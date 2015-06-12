var headerMenu_toggle = $('.mobileNavToggle');
var headerMenu_wrapper = $('.mobileNav');



// Toggle the Mobile Menu:
function openMobileMenu(){
    // Add the 'open' class to the button
    headerMenu_toggle.addClass('open');
    // Add the 'open' class to the menu container
    headerMenu_wrapper.addClass('open');
}
function closeMobileMenu(){
    // Remove the 'open' class from the button
    headerMenu_toggle.removeClass('open');
    // Remove the 'open' class from the menu container
    headerMenu_wrapper.removeClass('open');
}
headerMenu_toggle.on('click',function(){
    // console.log('the Toggle\'s been toggled!!!');
    // If the menu is already open...
    if ($(this).hasClass('open')) {
        // ... close it
        closeMobileMenu();
    // And if it's not open already...
    } else {
        // open the menu
        openMobileMenu();
    }
});