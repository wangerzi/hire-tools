<template>
    <Modal
            v-model="current"
            title="随机出题"
            :footer-hide="true">
        <i-form v-model="rule">
            <FormItem label="Min"></FormItem>
        </i-form>
        <copy-form></copy-form>
    </Modal>
</template>

<script>
  import CopyForm from "./CopyForm";
  export default {
    name: "RandomModal",
    components: { CopyForm },
    computed: {
      questionsNum() {
        return this.questionList.reduce((n, v) => n+v.length);
      }
    },
    props: {
      questionList: {
        type: Array,
        default: Array
      },
      initRule: {
        type: Object,
        default: () => {
          return {
            "min": 4,
            "max": 6,
            "min_section": 1,
            "max_section": 2
          }
        }
      }
    },
    watch: {
      initRule: {
        handler() {
          this.rule = {...this.initRule}
        }
      }
    },
    data: function () {
      return {
        current: false,
        rule: {...this.initRule}
      };
    },
    methods: {
      show() {
        this.current = true;
        this.handleRandom();
      },
      handleRandom() {
        if (!this.checkRule()) {
          this.current = false;
          return false;
        }
      },
      checkRule() {
        // 1. check min and max params
        if (this.rule.min > this.rule.max) {
          this.$Message.error('min questions num > max questions num')
          return false;
        }
        if (this.rule.min_section > this.rule.max_section) {
          this.$Message.error('min section questions num > max section questions num')
          return false;
        }
        // 2. check questions num is valid
        if (this.questionsNum < this.rule.min) {
          this.$Message.error('questions is not enough');
          return false;
        }
      }
    }
  }
</script>

<style scoped>

</style>