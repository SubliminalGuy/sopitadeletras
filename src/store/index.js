import Vue from 'vue';
import Vuex from 'vuex';

import logger from "./modules/logger"
import modal from "./modules/modal"
import teacher from "./modules/teacher"
import data from "@/utils/data.json"
import solution from "@/utils/solution.json"

Vue.use(Vuex);

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SIZE = 12;

// Generates visually distinct, vibrant HSL colors spread evenly around the hue wheel
function randomVibrantColors(count) {
    const startHue = Math.floor(Math.random() * 360);
    const step = Math.floor(360 / count);
    return Array.from({ length: count }, (_, i) => {
        const hue = (startHue + i * step) % 360;
        return `hsl(${hue}, 85%, 58%)`;
    });
}

function applyRandomColors(palabras) {
    const colors = randomVibrantColors(palabras.length);
    return palabras.map((p, i) => ({ ...p, color: colors[i] }));
}

function generateWordSoup(words) {
    const grid = Array(SIZE * SIZE).fill(null);
    const solutions = [];

    const directions = [
        { dr: 0, dc: 1 },   // right
        { dr: 1, dc: 0 },   // down
        { dr: 1, dc: 1 },   // diagonal down-right
        { dr: 1, dc: -1 },  // diagonal down-left
    ];

    for (let wi = 0; wi < words.length; wi++) {
        const word = words[wi].toUpperCase().trim();
        if (!word) continue;
        let placed = false;

        for (let attempt = 0; attempt < 300 && !placed; attempt++) {
            const dir = directions[Math.floor(Math.random() * directions.length)];

            const rowMax = dir.dr === 0 ? SIZE - 1 : SIZE - word.length;
            const colMin = dir.dc === -1 ? word.length - 1 : 0;
            const colMax = dir.dc === 1 ? SIZE - word.length : SIZE - 1;

            if (rowMax < 0 || colMax < colMin) continue;

            const row = Math.floor(Math.random() * (rowMax + 1));
            const col = colMin + Math.floor(Math.random() * (colMax - colMin + 1));

            let canPlace = true;
            const fields = [];
            for (let i = 0; i < word.length; i++) {
                const r = row + dir.dr * i;
                const c = col + dir.dc * i;
                const key = r * SIZE + c;
                if (grid[key] !== null && grid[key] !== word[i]) {
                    canPlace = false;
                    break;
                }
                fields.push(key);
            }

            if (canPlace) {
                for (let i = 0; i < word.length; i++) {
                    grid[fields[i]] = word[i];
                }
                solutions.push({
                    solucion: [fields[0].toString(), fields[fields.length - 1].toString()],
                    fields: fields.map(k => k.toString()),
                    color: null  // assigned after all words are placed
                });
                placed = true;
            }
        }

        if (!placed) {
            return null;
        }
    }

    const sopita = grid.map((letra, key) => ({
        letra: letra || LETTERS[Math.floor(Math.random() * LETTERS.length)],
        key
    }));

    return { sopita, palabras: applyRandomColors(solutions) };
}

const store = new Vuex.Store({
    state: {
        alphabet: data.sopita,
        palabras: applyRandomColors(solution.palabras)
    },
    getters: {
        getAlphabet: state => state.alphabet,
        getPalabras: state => state.palabras,
        getPalabrasCount: state => state.palabras.length
    },
    mutations: {
        updateAlphabet(state, alteredState) {
            state.alphabet = alteredState;
        },
        updatePalabras(state, palabras) {
            state.palabras = palabras;
        },
        resetToDefault(state) {
            state.alphabet = data.sopita;
            state.palabras = applyRandomColors(solution.palabras);
        }
    },
    actions: {
        updateAlphabet(context, alteredState) {
            context.commit('updateAlphabet', alteredState);
        },
        generateCustomPuzzle({ commit }, words) {
            const result = generateWordSoup(words);
            if (result) {
                commit('updateAlphabet', result.sopita);
                commit('updatePalabras', result.palabras);
                return true;
            }
            return false;
        },
        resetToDefault({ commit }) {
            commit('resetToDefault');
        }
    },
    modules: {
        logger,
        modal,
        teacher
    },
});

export default store;
