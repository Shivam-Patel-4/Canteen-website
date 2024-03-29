import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../Components/NavBar.css';

const NavBar = () => {
    const options = [
        { name: 'BreakFast', link: '/breakfast' },
        { name: 'Launch', link: '/launch' },
        { name: 'Dinner', link: '/dinner' }
      ];
      const [selectedOption, setSelectedOption] = useState(options[0].name); // Set the first option as default
    
      const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };

      return (
        <div className="radio-inputs">
        {options.map((option) => (
          <label key={option.name} className="radio">
            <input
              type="radio"
              name="radio"
              value={option.name}
              checked={selectedOption === option.name}
              onChange={handleOptionChange}
            />
            <Link to={option.link} className="name">{option.name}</Link>
          </label>
        ))}
      </div>
      );
}

export default NavBar;