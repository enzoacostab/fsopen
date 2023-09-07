export const calculateBmi = (height: number, weight: number): string => {
    if (isNaN(height) || isNaN(weight)) {throw new Error('all values ​​must be numbers');}
    const calc: number = weight/((height/100)*(height/100));
    if (calc < 18.5){
        return "Underweight (Unhealthy)";
    }
    else if (calc < 23){
        return "Normal range (Healthy)";
    }
    else if (calc < 25){
        return "Overweight I (At risk)";
    }
    else if (calc < 30){
        return "Overweight II (Moderately obese)";
    }
    else{
        return "Overweight III (Severely obese)";
    }
};
if (process.argv[2] && process.argv[3]){
    try{
        const x: number = Number(process.argv[2]);
        const y: number = Number(process.argv[3]);
        console.log(calculateBmi(x, y));
    }
    catch(e){
        console.log('error:', e.message);
    }
}
