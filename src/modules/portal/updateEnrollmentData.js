const enrollment = require('../../model/enrollmentModel')

async function updateEnrollmentData(data) {
    try {
        const pendingEnrolled = await enrollment.findOne({ userId: data.userId });

        if (!pendingEnrolled) {
            // Data was successfully updated
            const newEnrollment = new enrollment(data)
            await newEnrollment.save()

            return('success')
        } else if(pendingEnrolled && pendingEnrolled.status === 'Unverified'){
            // Enrollment form has already been submitted
            console.log('Error: You have already submitted an enrollment form');
            return('unverified')
        }else if(pendingEnrolled && pendingEnrolled.status === 'Pending'){
            return('pending')
        }
    } catch (error) {
        // Handle any database or other errors
        return `Error: ${error.message}`;
    }
}

module.exports = { updateEnrollmentData };
