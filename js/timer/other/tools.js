/* all tools */
class Tools {
    /* [convert string to integer]
       param1: string to convert
       return: converted number*/
    static StringToInt(_string) {
        // variables
        let _isHaveDecimalPoint = false; // has decimal point?
        let _numberString = ""; // number string
        // loop through each character in string (remove non-numeric parts)
        for (let i = 0; i < _string.length; i++) {
            // convert character to number
            let _chat = window.parseInt(_string[i]);
            // if conversion successful
            // note: (_chat===_chat) means if data equals itself, value is not NaN
            if (_chat === _chat) {
                // add this number to string
                _numberString += _chat;
            }
        }
        // if no number
        if (_numberString == "") {
            _numberString = "0";
        }
        // convert number string to number
        let _number = window.parseInt(_numberString);
        // return value
        return _number;
    }
    /* [convert string to float]
        param1: string to convert
        return: converted number*/
    static StringToFloat(_string) {
        // variables
        let _isHaveDecimalPoint = false; // has decimal point?
        let _numberString = "0"; // number string
        // loop through each character in string (remove non-numeric parts)
        for (let i = 0; i < _string.length; i++) {
            // if this character is decimal point
            if (_string[i] == ".") {
                // if no decimal point yet
                if (_isHaveDecimalPoint == false) {
                    // update flag
                    _isHaveDecimalPoint = true;
                    // add this decimal point to string
                    _numberString += ".";
                }
            }
            // if this character is not decimal point
            else {
                // convert character to number
                let _chat = window.parseFloat(_string[i]);
                // if conversion successful
                // note: (_chat===_chat) means if data equals itself, value is not NaN
                if (_chat === _chat) {
                    // add this number to string
                    _numberString += _chat;
                }
            }
        }
        // if no number
        if (_numberString == "") {
            _numberString = "0";
        }
        // convert number string to number
        let _number = window.parseFloat(_numberString);
        // return value
        return _number;
    }
    /* [convert number to string]
        (if number is 5 and digits is 2, output is 05)
        param1: a number
        param2: how many digits?*/
    static NumberToString(_number, _digits) {
        // variables
        let _numberString = _number + ""; // convert number to string
        let _string = ""; // string
        // if number is 5 and digits is 2, output is 05
        for (let i = 0; i < _digits; i++) {
            if (i < _numberString.length) {
                _string = _string + _numberString[i];
            }
            else {
                _string = "0" + _string;
            }
        }
        // return value
        return _string;
    }
    /* [clamp number between min and max]
       param1: a number
       param2: min value
       param3: max value
       return: clamped number */
    static ClampNumber(_number, _min, _max) {
        // number cannot be greater than max or less than min
        if (_number < _min) {
            _number = _min;
        }
        else if (_number > _max) {
            _number = _max;
        }
        // return value
        return _number;
    }
    /* [get random number (integer)]
       param1: min value
       param2: max value
       return: random number (include min, exclude max) */
    static RandomInt(_min, _max) {
        // first random a 0-1 number (include 0, exclude 1)
        let _randomNumber = Math.random();
        /* then multiply this number by another
           if [0-1] number multiply by 5, random range is [0-5]
           if multiply by (max-min)
           range is 0 to max-min!

           but not done yet, add min to this number
           range becomes min to max (include min, exclude max) */
        _randomNumber = _randomNumber * (_max - _min) + _min;
        // then convert to integer (remove decimal)
        _randomNumber = Math.floor(_randomNumber);
        // return value
        return _randomNumber;
    }
}