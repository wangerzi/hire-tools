<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu :active-name="activeName" theme="dark" width="auto" :class="menuitemClasses" @on-select="handleMenuItemClick">
                    <MenuItem :name="item.name" v-for="item of menus" :key="item.name">
                        <Icon :type="item.icon"></Icon>
                        <span>{{item.label}}</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSlider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    {{activeLabel}}
                </Header>
                <Content :style="{margin: '20px', padding: '20px', background: '#fff', minHeight: 'calc(87vh)'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import { menus } from '../routes/index'
    export default {
        name: "Main",
        data () {
            return {
                isCollapsed: false,
                menus,
                activeName: ""
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            activeLabel () {
                let label = '';
                for (let item of menus) {
                    if (item.name === this.activeName) {
                        label = item.label;
                    }
                }
                return label;
            }
        },
        methods: {
            collapsedSlider () {
                this.$refs.side1.toggleCollapse();
            },
            handleMenuItemClick (name) {
                if (name !== this.activeName) {
                    this.$router.push({
                        name,
                    })
                    this.activeName = name
                }
            }
        },
        mounted() {
            this.activeName = this.$route.name;
        }
    }
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        /*width: 90px;*/
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>