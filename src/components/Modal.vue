<template>
    <div v-if="getModal" class="modalUpper">
        <div class="modal-wrapper">&nbsp;</div>

        <div class="modal-window">
            <div class="modal-title">Muy bien! Lo has logrado! 🦄</div>
            
            <div class="button-wrapper">
                <button @click.prevent="hideModal" class="ok-button">Gracias</button>
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
                'getAlphabet'
            ])
        },
        methods: {
            hideModal() {
                this.$store.dispatch('hideModal')
                let newDataArray = this.getAlphabet.map(item => {
                    return item = {...item, color: "white"}
                    })
                this.$store.dispatch('updateAlphabet', newDataArray)
                this.$store.dispatch('deleteFundstueckCount')
            }
        }
    }
</script>