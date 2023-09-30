import React, {useState} from "react";

export const Form = () => {
    const [form, setForm] = useState ({
        name: "",
        age: "",
        sex: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <p> Nowy użytkownik </p>
            <div>
                <label> Imię </label>
                <input type="text" name="name" value={form.name} onChange={handleChange} />
            </div>
            <div>
                <label> Wiek </label>
                <input type="number" name="age" value={form.age} onChange={handleChange} />
            </div>
            <div>
                <label> Płeć </label>
                <input type="text" name="sex" value={form.sex} onChange={handleChange} />
            </div>
            <div>
                <button type="submit" className="submit_form">Dodaj</button> {/* przy zdarzeniu kliknięcia, zmiana koloru borderu na biały wraz z efektem shadow i odpowiednim przejściem*/}
            </div>
        </form>
    )
}