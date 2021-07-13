<template>
    <div v-if="getModal">
        <div class="modal-wrapper">&nbsp;</div>

        <div class="modal-window">
            <div class="modal-title">Muy bien! Lo has logrado!</div>
            
            <div class="button-wrapper">
                <button @click.prevent="$store.dispatch('hideModal')" class="ok-button">Gracias</button>
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
            ])
        }
    }
</script>