


function extractDegreeAndFunction(expression) {
    // Regular expression to match a number inside parentheses and the trigonometric function
    var regex = /([a-z]+)?\((\d+)\)|(\d+)\^(\d+)/;

    // Executing the regular expression on the input string
    var match = regex.exec(expression);
    console.log(match);
    // If there's a match
    if (match) {
        // Check if it's a trigonometric function or a power expression
        if (match[1]) {
            var func = match[1].toLowerCase(); // Extracting the function and converting to lowercase
            var degree = parseInt(match[2]); // Extracting the degree value
        } else {
            var degree = parseInt(match[3]); // Extracting the base value
            var exponent = parseInt(match[4]); // Extracting the exponent value
        }
        

        // Determining the function code if it's a trigonometric function
        if (func) {
            var funcCode;
            switch(func) {
                case "sin":
                    funcCode = 1;
                    break;
                case "cos":
                    funcCode = 2;
                    break;
                case "tan":
                    funcCode = 3;
                    break;
                default:
                    funcCode = 0; // Default to 0 if none of these functions are found
            }
            return [funcCode, degree];
        } else { // Return the base and exponent if it's a power expression
            return [4, Math.pow(degree, exponent)];
        }
    }
    
    // Return null if no match is found
    return [0, 0];
}

function cal(str){
    var display = document.getElementsByName('display')[0];
    let result;
    if (str.includes('%')) {
        // Split the string into operands
        var operands = str.split('%');
        
        // Perform modulo operation
        result = parseInt(operands[0]) % parseInt(operands[1]);
    }else{

    const [funcCode, degree] = extractDegreeAndFunction(str);  //array destructuring

    if(funcCode === 0){ // for non-trigonometric strings and power expressions
        result = eval(str);
    } else{
        var radians = degree * (Math.PI / 180);

        if(funcCode === 1){
            result = Math.sin(radians);
            result=parseFloat(result.toFixed(2));
        }
        else if(funcCode === 2){
            result = Math.cos(radians);
            result=parseFloat(result.toFixed(2));
        }
        else if(funcCode === 3){
            result = Math.tan(radians);
            if(result==16331239353195370){
            result="Undefined";
            }
            else{
            result=parseFloat(result.toFixed(2));
            }
        }
        else{
            result=degree;
        }
    }
}
    // result=parseFloat(result.toFixed(10));
    display.value = result;

}