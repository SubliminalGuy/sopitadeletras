<template>
    <div class="teacher-overlay">
        <div class="teacher-backdrop" @click="$emit('close')"></div>
        <div class="teacher-window">
            <button class="teacher-close" @click="$emit('close')">&times;</button>

            <!-- Login Step -->
            <div v-if="step === 'login'">
                <h3 class="teacher-title">Teacher Login</h3>
                <p v-if="loginError" class="teacher-error">Incorrect username or password.</p>
                <div class="teacher-field">
                    <label class="teacher-label">Username</label>
                    <input
                        v-model="username"
                        type="text"
                        class="teacher-input"
                        autocomplete="username"
                        @keyup.enter="tryLogin"
                    />
                </div>
                <div class="teacher-field">
                    <label class="teacher-label">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        class="teacher-input"
                        autocomplete="current-password"
                        @keyup.enter="tryLogin"
                    />
                </div>
                <button class="teacher-btn" @click="tryLogin">Login</button>
            </div>

            <!-- Word Input Step -->
            <div v-if="step === 'words'">
                <h3 class="teacher-title">Set Custom Words</h3>
                <p class="teacher-hint">Enter 5 to 7 words to embed in the puzzle.</p>
                <div v-for="(word, i) in words" :key="i" class="teacher-field">
                    <label class="teacher-label">
                        Word {{ i + 1 }}<span v-if="i >= 5" class="teacher-optional"> (optional)</span>
                    </label>
                    <input
                        v-model="words[i]"
                        type="text"
                        class="teacher-input"
                        :placeholder="i >= 5 ? 'optional' : ''"
                    />
                </div>
                <p v-if="wordError" class="teacher-error">{{ wordError }}</p>
                <div class="teacher-actions">
                    <button class="teacher-btn" @click="applyWords">Apply</button>
                    <button class="teacher-btn teacher-btn-secondary" @click="logout">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TeacherPanel',
    data() {
        return {
            step: this.$store.getters.getTeacherLoggedIn ? 'words' : 'login',
            username: '',
            password: '',
            loginError: false,
            words: ['', '', '', '', '', '', ''],
            wordError: ''
        }
    },
    methods: {
        async tryLogin() {
            this.loginError = false;
            const success = await this.$store.dispatch('teacherLogin', {
                username: this.username,
                password: this.password
            });
            if (success) {
                this.step = 'words';
            } else {
                this.loginError = true;
            }
        },
        async applyWords() {
            this.wordError = '';
            const filled = this.words.map(w => w.trim()).filter(w => w.length > 0);
            if (filled.length < 5) {
                this.wordError = 'Please enter at least 5 words.';
                return;
            }
            this.$store.dispatch('deleteFundstueckCount');
            this.$store.dispatch('hideModal');
            const success = await this.$store.dispatch('generateCustomPuzzle', filled);
            if (!success) {
                this.wordError = 'Could not fit all words in the grid. Try shorter words.';
                return;
            }
            this.$store.dispatch('setCustomWords', filled);
            this.$emit('close');
        },
        logout() {
            this.$store.dispatch('teacherLogout');
            this.$store.dispatch('resetToDefault');
            this.$store.dispatch('deleteFundstueckCount');
            this.$store.dispatch('hideModal');
            this.$emit('close');
        }
    }
}
</script>
