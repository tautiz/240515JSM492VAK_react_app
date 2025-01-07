function Greeting() {
    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return <h1>{greeting}</h1>;
}

export default Greeting;