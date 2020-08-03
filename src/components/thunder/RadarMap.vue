<template>
    <div>
        <div id="main" style="width: 100%;height: 30rem;"></div>
    </div>
</template>

<script>
    const echarts = require('echarts');

    export default {
        name: "ThunderMap",
        props: {
            title: {
                type: String,
                default: '姓名',
            },
            indicator: {
                type: Array,
                default() {
                    return [
                        {name: '销售（sales）', max: 6500},
                        {name: '管理（Administration）', max: 16000},
                        {name: '信息技术（Information Techology）', max: 30000},
                        {name: '客服（Customer Support）', max: 38000},
                        {name: '研发（Development）', max: 52000},
                        {name: '市场（Marketing）', max: 25000}
                    ]
                }
            },
            legendData: {
                type: Array,
                default() {
                    return ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'];
                }
            },
            series: {
                type: Array,
                default() {
                    return {
                        name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: [4300, 10000, 28000, 35000, 50000, 19000],
                                name: '预算分配（Allocated Budget）'
                            },
                            {
                                value: [5000, 14000, 28000, 31000, 42000, 21000],
                                name: '实际开销（Actual Spending）'
                            }
                        ]
                    }
                }
            },
        },
        computed: {
            option() {
                const optionTemplate = {
                    title: {
                        text: '',
                        subtextStyle: {
                            width: '100%',
                            align: 'center'
                        },
                    },
                    tooltip: {},
                    legend: {
                        data: []
                    },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: []
                    },
                    series: []
                };

                optionTemplate.title.text = this.title;
                optionTemplate.radar.indicator = this.indicator;
                optionTemplate.legend.data = this.legendData;
                optionTemplate.series = this.series;

                return optionTemplate;
            }
        },
        watch: {
            option: {
                handler() {
                    this.updateOption()
                }
            }
        },
        data() {
            return {
                myChart: null,
            }
        },
        mounted() {
            this.myChart = echarts.init(document.getElementById('main'));
            this.updateOption()
        },
        methods: {
            updateOption() {
                if (this.myChart) {
                    this.myChart.setOption(this.option)
                }
            }
        }
    }
</script>

<style scoped>

</style>