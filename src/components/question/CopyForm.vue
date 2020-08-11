<template>
    <i-form style="margin-top: 30px;">
        <FormItem label="Preview">
            <Input :value="copyContent" type="textarea" :autosize="true" readonly placeholder="Copy Content" />
            <p>{{this.selectedNum}} question{{this.selectedNum>1?'s':''}} selected!</p>
        </FormItem>
        <FormItem label="">
            <Button
                    icon="ios-copy"
                    type="primary"
                    v-clipboard:copy="copyContent"
                    v-clipboard:success="clipboardSuccessHandler"
                    v-clipboard:error="clipboardErrorHandler"
            >Copy Now</Button>
        </FormItem>
    </i-form>
</template>

<script>
    export default {
        name: "CopyForm",
        props: {
            copyContent: {
                type: String,
                default: "",
            },
            selectedNum: {
                type: Number,
                default: 0,
            },
        },
        methods: {
            clipboardSuccessHandler () {
                this.$Notice.success({
                    title: 'Copy Success!'
                })
            },
            clipboardErrorHandler () {
                this.$Notice.error({
                    title: 'Copy failed.Please copy manually!'
                })
            }
        }
    }
</script>

<style scoped>

</style>