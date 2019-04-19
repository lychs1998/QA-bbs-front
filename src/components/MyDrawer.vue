<template>
    <Drawer title="Basic Drawer" placement="left" :closable="false" v-model="value2">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Drawer>
</template>
<script>
    export default {
        data () {
            return {
                value2: false
            }
        }
    }
</script>