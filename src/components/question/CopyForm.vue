<template>
    <i-form style="margin-top: 30px;">
        <FormItem label="Preview">
            <Input :value="copyContent" type="textarea" :autosize="true" readonly placeholder="Copy Content"/>
            <p>{{this.selectedNum}} question{{this.selectedNum>1?'s':''}} selected!</p>
        </FormItem>
        <FormItem label="">
            <Button
                    icon="ios-copy"
                    type="success"
                    v-clipboard:copy="content"
                    v-clipboard:success="clipboardSuccessHandler"
                    v-clipboard:error="clipboardErrorHandler"
            >Copy Now
            </Button>
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
      copyItems: {
        type: Array,
        default: Array,
      },
      selectedNum: {
        type: Number,
        default: 0,
      },
    },
    computed: {
      content() {
        if (this.copyContent) {
          return this.copyContent;
        } else {
          return this.getCopyContents(this.copyItems);
        }
      },
      nums() {
        if (this.selectedNum) {
          return this.selectedNum;
        } else {
          return this.copyItems.length;
        }
      }
    },
    methods: {
      clipboardSuccessHandler() {
        this.$Notice.success({
          title: 'Copy Success!'
        })
      },
      getCopyContents(items) {
        let content = '';
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          content += ("Q" + (i + 1) + '. ' + item['title'] + "\n");
          if (item['answer']) {
            content += ("A: " + item['answer'] + "\n")
          }
          content += "\n";
        }
        return content;
      },
      clipboardErrorHandler() {
        this.$Notice.error({
          title: 'Copy failed.Please copy manually!'
        })
      }
    }
  }
</script>

<style scoped>

</style>