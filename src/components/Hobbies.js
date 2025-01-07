function Hobbies() {
    const hobbies = ["Mokymasis", "Kino žiūrėjimas", "Programavimas"];

    return (
        <ul>
            {hobbies.map((hobby, index) => (
                <li key={index}>{hobby}</li>
            ))}
        </ul>
    );
}

export default Hobbies;