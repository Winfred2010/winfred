const { Command } = require('commander');
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const readline = require('readline');

// --- Ninja Utility & Weather Logic ---
const actions = {
    greet: (name = 'Ninja') => {
        console.log(chalk.bold.green(`Greetings, ${name}!`));
    },
    fetchData: async () => {
        try {
            const res = await axios.get('https://coindesk.com');
            console.log(chalk.yellow(`Bitcoin Price: $${res.data.bpi.USD.rate}`));
        } catch (err) {
            console.log(chalk.red('Fetch Error:'), err.message);
        }
    },
    readFile: (filePath) => {
        if (!fs.existsSync(filePath)) return console.log(chalk.red('File not found'));
        console.log(chalk.cyan(fs.readFileSync(filePath, 'utf8')));
    },
    getWeather: async (city) => {
        try {
            const res = await axios.get(`https://wttr.in{city}?format=j1`);
            const current = res.data.current_condition[0];
            console.log(chalk.blue(`City: ${city} | Temp: ${current.temp_C}°C | ${current.weatherDesc[0].value}`));
        } catch {
            console.log(chalk.red('Weather search failed'));
        }
    },
    startDashboard: () => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question('Enter city for weather: ', (city) => {
            actions.getWeather(city).then(() => rl.close());
        });
    }
};

// --- CLI Configuration ---
const program = new Command();

program.command('greet [name]').action(actions.greet);
program.command('fetch').action(actions.fetchData);
program.command('read <file>').action(actions.readFile);
program.command('weather').action(actions.startDashboard);

program.parse(process.argv);
