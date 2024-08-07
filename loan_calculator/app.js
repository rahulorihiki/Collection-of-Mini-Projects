// now the submit event function of line 3 is slightly different from the submit event  that we had created in the previous two lecture because in the submit event of previous two lecture the event function for the submit event was the function called "calculateResults()" of line 19 but in this lecture the event function for the below submit event is not the "calculateResults()" rather it is some rqandom function{as you can see in line 3} and the "calculateResults()" is called INSIDE that random function as you can see in line 13
// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
	// Hide results
	// Now in this event function what we are trying to achieve is that whenever we click on the blue circle of page-2.png then a loading image as shown in green circle of page-2.png will show for about 2 seconds then only we will show the result as shown in the blue circle of page-3.png but initially as soon as the user enters the website we dont want the user to see the loading image as well as the result section that is why we made them disappear in the "index.html" file if you go to line 16 to line 22 of "index.html" file

	// now suppose the user clicks on the blue circle of page-2.png then we only want the user to see the lloading image INITIALLY i.e green circle of page-2.png and for about 2 seconds we dont want the user to see the result section i.e. blue circle of page-3.png  then only after the whole 2 seconds have passed we want the user to see the result section that is why initially displayed the loading image as shown in line "10 and 11"
	document.getElementById('results').style.display = 'none';
	// Now you may ask why we have again displayed the results as 'none' even though we have already done this step in line 16 to line 22 of the "index.html" file this is because suppose the user gives an input then clicked on the submit button now the user gives a different input and when we click on the submit button then the result of our previous input will still remain as shown in the red-circled portion of the page-4.png this is because when we displayed the first result then we overwrite the display 'none' of our index.html file due to the display 'block' of line 43  . this is why we again have to write display 'none' for the result section so that the red-circled portion part of the page-4.png doesnt appear when we click on the submit butoon FOR THE SECOND TIME
	// Show loader
	document.getElementById('loading').style.display = 'block';
	// now in line 7 we have told how we want the result section to be shown only after 2 seconds that is why we wrote line 13 and if you want to know about settimeout method then i have discussed about this method in previous lecture
	setTimeout(calculateResults, 2000);

	e.preventDefault();
});

// Calculate Results
function calculateResults() {
	console.log('Calculating...');
	// UI Vars
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// Compute monthly payment
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
		// Ahter the 2 seconds have passed we want only the result section to showup and we dont want the loading image   to show up after 2 seconds have passed that is why we in the below couple of lines we have made the result sectiom display 'block' and the loading image section as display 'none'
		// Show results
		document.getElementById('results').style.display = 'block';

		// Hide loader
		document.getElementById('loading').style.display = 'none';
	} else {
		showError('Please check your numbers');
	}
}

// Show Error
function showError(error) {
	// Now if the user has given a Wrong input then logically if the input given by the user is only wrong then there is no meaning in showing the result section because logically the input given by the user is only incorrect then how the hell are we suppose to show a result this is why in the below couple of lines we have made BOTH result section and the loading image section as display 'none'
	document.getElementById('results').style.display = 'none';

	// Hide loader
	document.getElementById('loading').style.display = 'none';

	// Create a div
	const errorDiv = document.createElement('div');

	// Get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// Add class
	errorDiv.className = 'alert alert-danger';

	// Create text node and append to div
	errorDiv.appendChild(document.createTextNode(error));

	// Insert error above heading
	card.insertBefore(errorDiv, heading);

	// Clear error after 3 seconds
	setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
	document.querySelector('.alert').remove();
}
