import axios from "axios"
import Razorpay from 'razorpay'
export function signUpUser(username, password, navigate, setwho) {
    console.log(username, password)
    if (username == '' | password == '') {
        alert('Invalid Input')
        return
    }
    try {
        axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'username': username,
                'password': password
            }
        }).then((res) => {
            if (res.status == 203) {
                alert('Email already present')
                return
            }
            localStorage.setItem('tokenUser', res.data.token)
            console.log(import.meta.env.VITE_API_URL)
            alert('User Created')
            setwho('user')
            navigate('/courseUser')
            return 'done';
        })
    } catch (err) {
        console.log('This is err', err.status)
        return
    }
}

export function loginUser(username, password, navigate, setwho) {
    console.log(username, password)
    if (username == '' | password == '') {
        alert('Invalid Input')
        return
    }
    try {
        axios.post(import.meta.env.VITE_API_URL + '/user/login', {}, {
            headers: {
                'Content-Type': 'application/json',
                'username': username,
                'password': password
            }
        }).then((res) => {
            if (res.status == 203) {
                alert('Wrong Password')
                return
            }
            if (res.status == 204) {
                alert('Wrong Username')
                return
            }
            localStorage.setItem('tokenUser', res.data.token)
            alert('Logged in as user')
            setwho('user')
            navigate('/courseUser')
        })
    } catch (err) {
        console.log('This is err', err)
    }
}

const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

const makePayment = async (amount) => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
    }

    try {
        const { data: { order } } = await axios.post(`${import.meta.env.VITE_API_URL}/user/checkout`, {
            amount: amount
        });

        const { data: { key } } = await axios.get(`${import.meta.env.VITE_API_URL}/user/getkey`);

        const options = {
            key: key,
            amount: amount,
            currency: "INR",
            name: "Himanshu Chaudhari",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();

        return new Promise((resolve, reject) => {
            rzp1.on('payment.success', (response) => {
                resolve(response);
            });
            rzp1.on('payment.error', (response) => {
                reject(response);
            });
        });
    } catch (error) {
        console.error('Error in making payment:', error);
        throw error;
    }
};

export async function purchaseCourse(id, price) {
    try {
        // Wait for the payment to complete
        console.log('Starting payment process...');
        await makePayment(price);
        console.log('Payment successful, proceeding with course purchase...');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/course/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'key': localStorage.getItem('tokenUser')
            }
        });
        if (response.status === 206) {
            alert('You have already purchased this course'); 
        } else {
            alert('Course Purchased');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error in purchasing course:', error);
        alert('An error occurred during the course purchase process. Please try again.');
    }
}

export function getPurchasedCourses(navigate, setPurchaseCourse) {
    try {
        axios.get(import.meta.env.VITE_API_URL + '/user/purchasedCourses', {
            headers: {
                'Content-Type': 'application/json',
                'key': localStorage.getItem('tokenUser')
            }
        }).then((res) => {
            if (res.status == 204) {
                alert('User Not found')
                return
            }
            if (res.data.purchasedCourses.length == 0) {
                alert("You havent purchased any course")
                return
            }
            console.log(res.data.purchasedCourses)
            setPurchaseCourse(res.data.purchasedCourses)
            navigate('/purchasedCourse')

        })
    } catch (err) {
        console.log('This is err', err)
    }
}
