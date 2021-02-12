<template>
    <div v-if="getModal">
        <div class="modal-wrapper">&nbsp;</div>

        <div class="modal-window">
            <div class="modal-title">La letra {{getLetter}}</div>
            <div class="modal-body">
                <div v-for="letterR in getInfoFieldRed" :key="letterR" class="text-red" @click="speak">
                    {{letterR}}
                </div>
            </div>
            <div class="modal-body">
                <div v-for="letterG in getInfoFieldGreen" :key="letterG" class="text-green" @click="speak">
                    {{letterG}}
                </div>
            </div>
            <div class="button-wrapper">
                <button @click.prevent="$store.dispatch('hideModal')" class="ok-button">OK</button>
            </div>
        </div>


    </div>

</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters([
                'getModal',
                'getLetter',
                'getInfoFieldRed',
                'getInfoFieldGreen'
            ])
        },
        methods: {
            speak(e) {
                //console.log(e.target.innerText)
                this.$emit('speakLetter', {msg: e.target.innerText})
            }
        }
    }
</script>