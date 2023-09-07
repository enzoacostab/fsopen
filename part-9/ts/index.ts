import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const {height, weight} = _req.query;

    if (height && weight){
        try{
            res.json({height, weight, bmi: calculateBmi(Number(height), Number(weight))});
        } catch(e){
            res.status(400).json({error: e.message});
        }
    }
});

app.post('/exercises', (_req, res) => {
    const {target, daily_exercises} = _req.body;

    if (target && daily_exercises){
        try{
            const de: Array<number> = daily_exercises;
            const t: number = Number(target);
            res.json(calculateExercises(de, t));
        } catch(e){
            res.status(400).json({
                error: "malformatted parameters"
              });
        }
    }
    else{
    res.json({
        error: "parameters missing"
      });
    }
});

app.listen(3000, () => {
    console.log('server running on port 3000');
});
