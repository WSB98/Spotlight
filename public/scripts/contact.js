

 // Get a reference to the form and its elements
 const form = document.getElementById("contact-form");
 const nameInput = document.getElementById("subjectInput");
 const emailInput = document.getElementById("emailInput");
 const messageInput = document.getElementById("messageInput");

 // Add an event listener to the form's submit button
 form.addEventListener("submit", function(event) {
   // Build the mailto URL with the subject line including the name entered in the form
   const subject = `Contact Request By:  ${emailInput.value} for ${nameInput.value}`;
   const body = `${messageInput.value}`;
   const mailtoUrl = `mailto:billiamsbaker@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

   // Open the user's email client with the pre-populated email message
   window.location.href = mailtoUrl;

   // Prevent the form from submitting and refreshing the page
   event.preventDefault();
 });

 const form_mob = document.getElementById("contact-form_mob");
 const nameInput_mob = document.getElementById("subjectInput_mob");
 const emailInput_mob = document.getElementById("emailInput_mob");
 const messageInput_mob = document.getElementById("message_mob");

 // Add an event listener to the form's submit button
 form_mob.addEventListener("submit", function(event) {
   // Build the mailto URL with the subject line including the name entered in the form
   const subject = `Contact Request By:  ${emailInput_mob.value} for ${nameInput_mob.value}`;
   const body = `${messageInput_mob.value}`;
   const mailtoUrl = `mailto:billiamsbaker@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

   // Open the user's email client with the pre-populated email message
   window.location.href = mailtoUrl;

   // Prevent the form from submitting and refreshing the page
   event.preventDefault();
 });