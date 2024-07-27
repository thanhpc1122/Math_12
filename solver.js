let a, b, c, d, e;
let x, g, h;
let linearSolution = 0;
let quadraticSolution1 = 0, quadraticSolution2 = 0;
let cubicSolution1 = 0, cubicSolution2 = 0, cubicSolution3 = 0;
let z;

function getCoefficients(degree) {
    let coefficientsInput = document.getElementById('coefficients').value.split(' ').map(Number);
    
    try {
        switch(degree) {
            case 1:
                if (coefficientsInput.length !== 2) throw new Error("Số lượng hệ số không hợp lệ cho phương trình bậc nhất.");
                [a, b] = coefficientsInput;
                break;
            case 2:
                if (coefficientsInput.length !== 3) throw new Error("Số lượng hệ số không hợp lệ cho phương trình bậc hai.");
                [a, b, c] = coefficientsInput;
                break;
            case 3:
                if (coefficientsInput.length !== 4) throw new Error("Số lượng hệ số không hợp lệ cho phương trình bậc ba.");
                [a, b, c, d] = coefficientsInput;
                break;
            case 4:
                if (coefficientsInput.length !== 5) throw new Error("Số lượng hệ số không hợp lệ cho phương trình bậc bốn.");
                [a, b, c, d, e] = coefficientsInput;
                break;
            default:
                throw new Error("Bậc của phương trình không hợp lệ.");
        }
    } catch (error) {
        document.getElementById('output').textContent = error.message;
        throw error; // Ném lỗi lên để `solveEquation` có thể xử lý
    }
}

function solveEquation() {
    // Lấy giá trị bậc cao nhất của phương trình
    x = parseInt(document.getElementById('degree').value);
    
    // Lấy giá trị đoạn hoặc khoảng
    let rangeInput = document.getElementById('range').value.split(' ');
    g = parseFloat(rangeInput[0]);
    h = parseFloat(rangeInput[1]);

    // Lấy và kiểm tra các hệ số
    try {
        getCoefficients(x);
    } catch (error) {
        return; // Dừng thực hiện nếu có lỗi
    }

    z = parseInt(document.getElementById('choice').value);
    if (z === 2) {
        // In ra phương trình hoàn chỉnh
        printOutSystemOfEquations(x, a, b, c, d, e);
        derivative(x, a, b, c, d, e);
        minMax(x, a, b, c, d, e, g, h, linearSolution, quadraticSolution1, quadraticSolution2, cubicSolution1, cubicSolution2, cubicSolution3);
    } else if (z === 3) {
        x = 4;
        printOutSystemOfEquationsFraction(x, a, b, c, d, e);
        derivativeFraction(x, a, b, c, d, e);
        minMaxEquations(
            3, a, b, c, d, e, g, h,
            linearSolution,
            quadraticSolution1, quadraticSolution2, 
            cubicSolution1, cubicSolution2, cubicSolution3
        )
    }
}


function printOutSystemOfEquationsFraction(x, a, b, c, d, e) {
    let output4 = document.getElementById('output4');
    let output5 = document.getElementById('output5');
    let output1 = document.getElementById('output1');

    if (x === 3) {
        output4.innerHTML = `.. ${a}x + (${b})`;
        output5.innerHTML = "y = ------------";
        output1.innerHTML = `.. ${c}x + ${d}`;
    } else if (x === 4) {
        output4.innerHTML = `      ${a}x^2 + (${b})x + (${c})`;
        output5.innerHTML = "y  = ------------------";
        output1.innerHTML = `      ${d}x + (${e})`;
    }
}
function derivativeFraction(x, a, b, c, d, e) {
    let output2 = document.getElementById('output2');
    let output6 = document.getElementById('output6');
    let output7 = document.getElementById('output7');
    if (z == 3){
        x = 4;
    }

    let numeratorA = a;
    let numeratorB = b;
    let numeratorC = c;
    
    a *= d;
    b = 2 * numeratorA * e;
    c = numeratorB * e - numeratorC * d;

    if (x === 4) {
        output2.innerHTML = `      ${a}x^2 + (${b})x + (${c})`;
        output6.innerHTML = "y`  = ------------------ = 0";
        output7.innerHTML = `      [${d}x + (${e})]^2`;
    } else {
        output2.innerHTML = "Chỉ hỗ trợ bậc 2 cho x.";
        output6.innerHTML = "";
        output7.innerHTML = "";
    }

    solveQuadraticEquationZ_3(a, b, c );

}
function solveQuadraticEquationZ_3(a, b, c) { // phương trình bậc 2
    let output3 = document.getElementById('output3');
    let delta = b * b - 4 * a * c;

    if (delta > 0) {
        quadraticSolution1 = parseFloat(((-b + Math.sqrt(delta)) / (2 * a)).toFixed(5));
        quadraticSolution2 = parseFloat(((-b - Math.sqrt(delta)) / (2 * a)).toFixed(5));
        output3.innerHTML  = `Phương trình có 2 nghiệm phân biệt: x1 = ${quadraticSolution1}, x2 = ${quadraticSolution2}`;
    } else if (delta === 0) {
        quadraticSolution1 = parseFloat((-b / (2 * a)).toFixed(4));
        output3.innerHTML  = `Phương trình có 1 nghiệm duy nhất: x = ${quadraticSolution1}`;
    } else {
        output3.innerHTML  = "Phương trình bậc 2 vô nghiệm.";
    }
}
function minMaxEquations(
    x, a, b, c, d, e, g, h,
    linearSolution,
    quadraticSolution1, quadraticSolution2, 
    cubicSolution1, cubicSolution2, cubicSolution3
) {
    let output8 = document.getElementById('output8');
    output8.innerHTML  = `Phương trình có 2 nghiệm phân biệt: x1 = ${quadraticSolution1}, x2 = ${quadraticSolution2}`;
    let output9 = document.getElementById('output9');
    let output10 = document.getElementById('output10');
    let output11 = document.getElementById('output11');
    let output12 = document.getElementById('output12');
    let output13 = document.getElementById('output13');
    let output14 = document.getElementById('output14');

    if (x === 2) { // Bậc 1
        output9.innerHTML = `f(${g}) = ${a * Math.pow(g, 2) + b * g + c}`;
        output10.innerHTML = `f(${h}) = ${a * Math.pow(h, 2) + b * h + c}`;
        if (linearSolution >= g && linearSolution <= h && linearSolution !== 0) {
            output11.innerHTML = `f(${linearSolution}) = ${a * Math.pow(linearSolution, 2) + b * linearSolution + c}`;
            output12.innerHTML = "Tu suy ra min - max";
        } else {
            output11.innerHTML = "";
            output12.innerHTML = "";
        }
    } else if (x === 3) { // Bậc 2
        output9.innerHTML = `f(${g}) = ${(a * Math.pow(g, 2) + b * Math.pow(g, 1) + c) / (d * g + e)}`;
        output10.innerHTML = `f(${h}) = ${(a * Math.pow(h, 2) + b * Math.pow(h, 1) + c) / (d * h + e)}`;
        if (quadraticSolution1 >= g && quadraticSolution1 <= h && quadraticSolution1 !== 0) {
            output11.innerHTML = `f(${quadraticSolution1}) = ${(a * Math.pow(quadraticSolution1, 2) + b * Math.pow(quadraticSolution1, 1) + c) / (d * quadraticSolution1 + e)}`;
        } else {
            output11.innerHTML = "";
        }
        if (quadraticSolution2 >= g && quadraticSolution2 <= h && quadraticSolution2 !== 0) {
            output12.innerHTML = `f(${quadraticSolution2}) = ${(a * Math.pow(quadraticSolution2, 2) + b * Math.pow(quadraticSolution2, 1) + c) / (d * quadraticSolution2 + e)}`;
        } else {
            output12.innerHTML = "";
        }
        output13.innerHTML = "Tu suy ra min - max";
    } else if (x === 4) { // Bậc 3
        output9.innerHTML = `f(${g}) = ${a * Math.pow(g, 4) + b * Math.pow(g, 3) + c * Math.pow(g, 2) + d * g + e}`;
        output10.innerHTML = `f(${h}) = ${a * Math.pow(h, 4) + b * Math.pow(h, 3) + c * Math.pow(h, 2) + d * h + e}`;
        if (cubicSolution1 >= g && cubicSolution1 <= h && cubicSolution1 !== 0) {
            output11.innerHTML = `f(${cubicSolution1}) = ${a * Math.pow(cubicSolution1, 4) + b * Math.pow(cubicSolution1, 3) + c * Math.pow(cubicSolution1, 2) + d * cubicSolution1 + e}`;
        } else {
            output11.innerHTML = "";
        }
        if (cubicSolution2 >= g && cubicSolution2 <= h && cubicSolution2 !== 0) {
            output12.innerHTML = `f(${cubicSolution2}) = ${a * Math.pow(cubicSolution2, 4) + b * Math.pow(cubicSolution2, 3) + c * Math.pow(cubicSolution2, 2) + d * cubicSolution2 + e}`;
        } else {
            output12.innerHTML = "";
        }
        if (cubicSolution3 >= g && cubicSolution3 <= h && cubicSolution3 !== 0) {
            output13.innerHTML = `f(${cubicSolution3}) = ${a * Math.pow(cubicSolution3, 4) + b * Math.pow(cubicSolution3, 3) + c * Math.pow(cubicSolution3, 2) + d * cubicSolution3 + e}`;
        } else {
            output13.innerHTML = "";
        }
        output14.innerHTML = "Tu suy ra min - max";
    }
}







function printOutSystemOfEquations(x, a, b, c, d, e) {
    let equation = "y = ";
    if (x === 1) {
        equation += `${a}x + (${b}) = 0`;
    } else if (x === 2) {
        equation += `${a}x^2 + (${b})x + (${c}) = 0`;
    } else if (x === 3) {
        equation += `${a}x^3 + (${b})x^2 + (${c})x + (${d}) = 0`;
    } else if (x === 4) {
        equation += `${a}x^4 + (${b})x^3 + (${c})x^2 + (${d})x + (${e}) = 0`;
    }
    document.getElementById('output4').textContent = equation;
}
function derivative(x, a, b, c, d, e) {
    // Kiểm tra và tính đạo hàm theo từng bậc
    if (x === 1) {
        b = 0;
        c = 0;
        d = 0;
        e = 0;
    } else if (x === 2) {
        a *= 2;
        b = b; // Đạo hàm là b
        c = 0;
        d = 0;
        e = 0;
    } else if (x === 3) {
        a *= 3;
        b *= 2;
        c = c; // Đạo hàm là c
        d = 0;
        e = 0;
    } else if (x === 4) {
        a *= 4;
        b *= 3;
        c *= 2;
        d = d; // Đạo hàm là d
        e = 0;
    }

    // Giảm bậc của phương trình sau khi đạo hàm
    x -= 1;

    // In ra phương trình sau khi đạo hàm
    printOutSystemOfEquationsDerivative(x, a, b, c, d, e);

    // Gọi hàm giải phương trình sau khi đạo hàm
    solveTheSystemOfEquations(x, a, b, c, d, e);
}
function minMaxEquations(
    x, a, b, c, d, e, g, h,
    linearSolution,
    quadraticSolution1, quadraticSolution2, 
    cubicSolution1, cubicSolution2, cubicSolution3
) {
    let output8 = document.getElementById('output8');
    let output9 = document.getElementById('output9');
    let output10 = document.getElementById('output10');
    let output11 = document.getElementById('output11');
    let output12 = document.getElementById('output12');
    let output13 = document.getElementById('output13');

    output8.innerHTML = "";
    output9.innerHTML = "";
    output10.innerHTML = "";
    output11.innerHTML = "";
    output12.innerHTML = "";
    output13.innerHTML = "";

    if (x == 2) { // trả về bậc 1
        output8.innerHTML = `f(${g}) = ${(a * Math.pow(g, 2) + b * g + c)}`;
        output9.innerHTML = `f(${h}) = ${(a * Math.pow(h, 2) + b * h + c)}`;
        if (linearSolution >= g && linearSolution <= h && linearSolution != 0) {
            output10.innerHTML = `f(${linearSolution}) = ${(a * Math.pow(linearSolution, 2) + b * linearSolution + c)}`;
            output11.innerHTML = "Tu suy ra min - max";
        }
    } else if (x == 3) { // trả về bậc 2
        output8.innerHTML = `f(${g}) = ${(a * Math.pow(g, 2) + b * g + c) / (d * g + e)}`;
        output9.innerHTML = `f(${h}) = ${(a * Math.pow(h, 2) + b * h + c) / (d * h + e)}`;
        if (quadraticSolution1 >= g && quadraticSolution1 <= h && quadraticSolution1 != 0) {
            output10.innerHTML = `f(${quadraticSolution1}) = ${(a * Math.pow(quadraticSolution1, 2) + b * quadraticSolution1 + c) / (d * quadraticSolution1 + e)}`;
        }
        if (quadraticSolution2 >= g && quadraticSolution2 <= h && quadraticSolution2 != 0) {
            output11.innerHTML = `f(${quadraticSolution2}) = ${(a * Math.pow(quadraticSolution2, 2) + b * quadraticSolution2 + c) / (d * quadraticSolution2 + e)}`;
        }
        output12.innerHTML = "Tu suy ra min - max";
    } else if (x == 4) { // trả về pt bậc 3
        output8.innerHTML = `f(${g}) = ${(a * Math.pow(g, 4) + b * Math.pow(g, 3) + c * Math.pow(g, 2) + d * g + e)}`;
        output9.innerHTML = `f(${h}) = ${(a * Math.pow(h, 4) + b * Math.pow(h, 3) + c * Math.pow(h, 2) + d * h + e)}`;
        if (cubicSolution1 >= g && cubicSolution1 <= h && cubicSolution1 != 0) {
            output10.innerHTML = `f(${cubicSolution1}) = ${(a * Math.pow(cubicSolution1, 4) + b * Math.pow(cubicSolution1, 3) + c * Math.pow(cubicSolution1, 2) + d * cubicSolution1 + e)}`;
        }
        if (cubicSolution2 >= g && cubicSolution2 <= h && cubicSolution2 != 0) {
            output11.innerHTML = `f(${cubicSolution2}) = ${(a * Math.pow(cubicSolution2, 4) + b * Math.pow(cubicSolution2, 3) + c * Math.pow(cubicSolution2, 2) + d * cubicSolution2 + e)}`;
        }
        if (cubicSolution3 >= g && cubicSolution3 <= h && cubicSolution3 != 0) {
            output12.innerHTML = `f(${cubicSolution3}) = ${(a * Math.pow(cubicSolution3, 4) + b * Math.pow(cubicSolution3, 3) + c * Math.pow(cubicSolution3, 2) + d * cubicSolution3 + e)}`;
        }
        output13.innerHTML = "Tu suy ra min - max";
    }
}


function printOutSystemOfEquationsDerivative(x, a, b, c, d, e) {
    let equation = "y' = ";
    if (x === 0) {
        equation += `${a}`;
    } else if (x === 1) {
        equation += `${a}x + (${b}) = 0`;
    } else if (x === 2) {
        equation += `${a}x^2 + (${b})x + (${c}) = 0`;
    } else if (x === 3) {
        equation += `${a}x^3 + (${b})x^2 + (${c})x + (${d}) = 0`;
    }
    document.getElementById('output5').textContent = equation;
}

function solveTheSystemOfEquations(x, a, b, c, d, e) {
    if (x === 1) {
        solveLinearEquation(a, b); // Giải PT bậc 1
    } else if (x === 2) {
        solveQuadraticEquation(a, b, c); // Giải PT bậc 2
    } else if (x === 3) {
        solveCubicEquation(a, b, c, d); // Giải PT bậc 3
    }
}

function solveLinearEquation(a, b) { // pt bậc 1
    let output = document.getElementById('output1');
    if (a === 0) {
        if (b === 0)
            output.textContent = "Phương trình có vô số nghiệm.";
        else
            output.textContent = "Phương trình vô nghiệm.";
    } else {
        linearSolution = parseFloat((-b / a).toFixed(4));
        output.textContent = `Phương trình bậc 1 có nghiệm: x = ${linearSolution}`;
    }
}

function solveQuadraticEquation(a, b, c) { // phương trình bậc 2
    let output = document.getElementById('output2');
    let delta = b * b - 4 * a * c;

    if (delta > 0) {
        quadraticSolution1 = parseFloat(((-b + Math.sqrt(delta)) / (2 * a)).toFixed(5));
        quadraticSolution2 = parseFloat(((-b - Math.sqrt(delta)) / (2 * a)).toFixed(5));
        output.textContent = `Phương trình có 2 nghiệm phân biệt: x1 = ${quadraticSolution1}, x2 = ${quadraticSolution2}`;
    } else if (delta === 0) {
        quadraticSolution1 = quadraticSolution2 = parseFloat((-b / (2 * a)).toFixed(4));
        output.textContent = `Phương trình có 1 nghiệm duy nhất: x = ${quadraticSolution1}`;
    } else {
        output.textContent = "Phương trình bậc 2 vô nghiệm.";
    }
}

function solveCubicEquation(a, b, c, d) { // phương trình bậc 3
    let output = document.getElementById('output3');
    if (a === 0) {
        output.textContent = "Phương trình vô nghiệm.";
        return;
    }

    let dt = b * b - 3 * a * c; // delta = b*b - 3*a*c
    let k = (9 * a * b * c - 2 * Math.pow(b, 3) - 27 * Math.pow(a, 2) * d) /
            (2 * Math.sqrt(Math.pow(Math.abs(dt), 3)));

    if (dt > 0) {
        if (Math.abs(k) <= 1) {
            cubicSolution1 = parseFloat(((2 * Math.sqrt(dt) * Math.cos(Math.acos(k) / 3) - b) / (3 * a)).toFixed(4));
            cubicSolution2 = parseFloat(((2 * Math.sqrt(dt) * Math.cos(Math.acos(k) / 3 - (2 * Math.PI / 3)) - b) / (3 * a)).toFixed(4));
            cubicSolution3 = parseFloat(((2 * Math.sqrt(dt) * Math.cos(Math.acos(k) / 3 + (2 * Math.PI / 3)) - b) / (3 * a)).toFixed(4));
            output.textContent = `Phương trình có 3 nghiệm phân biệt: x1 = ${cubicSolution1}, x2 = ${cubicSolution2}, x3 = ${cubicSolution3}`;
        } else {
            cubicSolution1 = parseFloat((((Math.sqrt(dt) * Math.abs(k) / (3 * a * k)) * 
                            Math.pow((Math.abs(k) + Math.sqrt(Math.pow(k, 2) - 1)), 1.0 / 3) +
                            Math.pow((Math.abs(k) - Math.sqrt(Math.pow(k, 2) - 1)), 1.0 / 3) - (b / (3 * a)))).toFixed(4));
            output.textContent = `Phương trình có 1 nghiệm duy nhất là: ${cubicSolution1}`;
        }
    } else if (dt === 0) {
        cubicSolution1 = parseFloat(((-b - Math.pow(-(Math.pow(b, 3) - 27 * a * a * d), 1.0 / 3)) / (3 * a)).toFixed(4));
        output.textContent = `Phương trình có nghiệm bội: ${cubicSolution1}`;
    } else {
        cubicSolution1 = parseFloat((((Math.sqrt(Math.abs(dt)) / (3 * a)) * 
                            (Math.pow((k + Math.sqrt(k * k + 1)), 1.0 / 3) - 
                            Math.pow(-(k - Math.sqrt(k * k + 1)), 1.0 / 3)) - (b / (3 * a)))).toFixed(4));
        output.textContent = `Phương trình có 1 nghiệm duy nhất: ${cubicSolution1}`;
    }
}

function minMax(
    x, a, b, c, d, e, g, h,
    linearSolution,
    quadraticSolution1, quadraticSolution2,
    cubicSolution1, cubicSolution2, cubicSolution3
) {
    let outputContent = '';

    if (x === 2) {
        outputContent += `f(${g}) = ${(a * Math.pow(g, 2) + b * g + c)}<br>`;
        outputContent += `f(${h}) = ${(a * Math.pow(h, 2) + b * h + c)}<br>`;
        
        if (linearSolution >= g && linearSolution <= h && linearSolution !== 0)
        {
            outputContent += `f(${linearSolution}) = ${(a * Math.pow(linearSolution, 2) + b * linearSolution + c)} <br>`;
        }
        
        outputContent += "Từ suy ra min - max<br>";
        document.getElementById('output6').innerHTML = outputContent;
    } else if (x === 3) {//
        outputContent += `f(${g}) = ${(a * Math.pow(g, 3) + b * Math.pow(g, 2) + c * g + d)}<br>`;
        outputContent += `f(${h}) = ${(a * Math.pow(h, 3) + b * Math.pow(h, 2) + c * h + d)}<br>`;
        
        if (quadraticSolution1 >= g && quadraticSolution1 <= h && quadraticSolution1 !== 0) {
            outputContent += `f(${quadraticSolution1}) = ${(a * Math.pow(quadraticSolution1, 3) + b * Math.pow(quadraticSolution1, 2) + c * quadraticSolution1 + d)}<br>`;
        }
        if (quadraticSolution2 >= g && quadraticSolution2 <= h && quadraticSolution2 !== 0) {
            outputContent += `f(${quadraticSolution2}) = ${(a * Math.pow(quadraticSolution2, 3) + b * Math.pow(quadraticSolution2, 2) + c * quadraticSolution2 + d)}<br>`;
        }
        
        outputContent += "Từ suy ra min - max<br>";
        document.getElementById('output9').innerHTML = outputContent;
    } else if (x === 4) {
        outputContent += `f(${g}) = ${(a * Math.pow(g, 4) + b * Math.pow(g, 3) + c * Math.pow(g, 2) + d * g + e)}<br>`;
        outputContent += `f(${h}) = ${(a * Math.pow(h, 4) + b * Math.pow(h, 3) + c * Math.pow(h, 2) + d * h + e)}<br>`;
        
        if (cubicSolution1 >= g && cubicSolution1 <= h && cubicSolution1 !== 0) {
            outputContent += `f(${cubicSolution1}) = ${(a * Math.pow(cubicSolution1, 4) + b * Math.pow(cubicSolution1, 3) + c * Math.pow(cubicSolution1, 2) + d * cubicSolution1 + e)}<br>`;
        }
        if (cubicSolution2 >= g && cubicSolution2 <= h && cubicSolution2 !== 0) {
            outputContent += `f(${cubicSolution2}) = ${(a * Math.pow(cubicSolution2, 4) + b * Math.pow(cubicSolution2, 3) + c * Math.pow(cubicSolution2, 2) + d * cubicSolution2 + e)}<br>`;
        }
        if (cubicSolution3 >= g && cubicSolution3 <= h && cubicSolution3 !== 0) {
            outputContent += `f(${cubicSolution3}) = ${(a * Math.pow(cubicSolution3, 4) + b * Math.pow(cubicSolution3, 3) + c * Math.pow(cubicSolution3, 2) + d * cubicSolution3 + e)}<br>`;
        }

        outputContent += "Từ suy ra min - max<br>";
        document.getElementById('output8').innerHTML = outputContent;
    }
}
