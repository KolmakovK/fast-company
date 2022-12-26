import React from 'react'

const SearchStatus = ({ length }) => {
    function declOfNum(number, text_forms) {
        number = Math.abs(number) % 100;
        const n1 = number % 10;
        if (number > 10 && number < 20) {
            return text_forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return text_forms[1];
        }
        if (n1 === 1) {
            return text_forms[0];
        }
        return text_forms[2];
    }

    const variantsWord1 = ["человек", "человека", "человек"]
    const variantsWord2 = ["тусанёт", "тусанёт", "тусанут"]

    const phrase = length !== 0
        ? `${length} ${declOfNum(length, variantsWord1)} ${declOfNum(length, variantsWord2)} с тобой сегодня`
        : 'Никто с тобой не тусанет'

    const colorPhrase = length !== 0 ? 'badge bg-primary' : 'badge bg-danger'

    return  <h2>
                <span className = {colorPhrase} >
                    {phrase}
                </span>
            </h2>
};

export default SearchStatus