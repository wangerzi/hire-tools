<template>
    <span>
        <div style="margin: 0 auto;">
            <thunder-editor @submit="handleSubmit"></thunder-editor>
        </div>
        <thunder-map :title="title" :indicator="indicator" :legend-data="legendData" :series="series" v-if="formData"></thunder-map>
    </span>
</template>

<script>
    import ThunderMap from "../components/ThunderMap";
    import ThunderEditor from "../components/ThunderEditor";
    export default {
        name: 'Thunder',
        components: {
            ThunderMap,
            ThunderEditor,
        },
        computed: {
            title() {
                return '满分：' + 100 +'，得分：' + (this.sumScore / this.sumTotal * 100).toFixed(2);
            },
            indicator() {
                if (!this.formData) {
                    return [];
                }
                const data = [];
                for (const item of this.formData.items) {
                    data.push({
                        name: item.title + '(weight：'+item.weight+')',
                        max: item.weight,
                    })
                }
                return data;
            },
            legendData() {
                return [this.formData.name, '60%标准线'];
            },
            sumTotal() {
                let score = 0;
                for (const item of this.formData.items) {
                    score += item.total * item.weight;
                }
                return score;
            },
            sumScore() {
                let score = 0;
                for (const item of this.formData.items) {
                    score += item.score * item.weight;
                }
                return score;
            },
            series() {
                const data = [];
                const data60 = [];
                for (const item of this.formData.items) {
                    data.push((item.score / item.total * item.weight).toFixed(2));
                    data60.push((0.6 * item.weight).toFixed(2));
                }
                return [{
                    name: this.formData.name,
                    type: 'radar',
                    areaStyle: {normal: {}},
                    data: [
                        {
                            value: data,
                            name: this.formData.name
                        },
                        {
                            value: data60,
                            name: '60%标准线',
                        }
                    ]
                }];
            }
        },
        data() {
            return {
                formData: null,
            }
        },
        methods: {
            handleSubmit(formData) {
                this.formData = formData;
            }
        }
    }
</script>

<style scoped>

</style>