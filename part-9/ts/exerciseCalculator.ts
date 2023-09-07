interface Result { periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number }

export const calculateExercises = (hd: Array<number>, obj: number): Result => {
    if (!Array.isArray(hd)) {throw new Error('you must enter a list of hours trained per day');}
    if (isNaN(obj) || hd.some(e => isNaN(e))) {throw new Error('all values ​​must be numbers');}
    const avg: number = hd.reduce((a,b) => a+b)/hd.length;
    const rating: number = avg<obj-.5 ? 1 : avg<obj ? 2 : 3;
    let rdes: string = '';
    switch(rating){
        case 1: rdes='bad'; break;
        case 2: rdes='could be better'; break;
        case 3: rdes='good'; break;
    }
    return {
        periodLength: hd.length,
        trainingDays: hd.filter(e => e!=0).length,
        target: obj,
        success: avg>=obj ? true : false,
        average: avg,
        rating: rating,
        ratingDescription: rdes
    };
};
if (process.argv[2] && process.argv[3]){
    try{
        const a: Array<number> = JSON.parse(process.argv[2]);
        const b: number = Number(process.argv[3]);
        console.log(calculateExercises(a, b));
    } catch (e) {
        console.log('error:', e.message);
    }
}