<template>
    <LeftRightLayout class="terminal-index-warp">
        <template slot="left">
            <div class="title">文件列表</div>
            <ul class="tree-parent" ref="terminalParentRef">
                <li>
                    <div class="title">
                        <img src="~@/assets/index/this.png">
                        <span>123</span>
                    </div>
                    <el-tree

                            highlight-current
                            style="font-size: 14px"
                            :data="treelist"
                            :expand-on-click-node="false"
                            :default-expand-all='false'
                            node-key="id"
                            ref="menu-tree"
                            @node-click="queryTable"
                    >
                    </el-tree>
                </li>
            </ul>
        </template>
        <ListLayout class="resource-audit-upload-transcoding-list-wrap" title="文件夹列表" slot="right">
            <template slot="top-right">
                <!--<el-button class="list-button list-button-orange" @click="handleBatchBs()">报送</el-button>-->
            </template>
            <el-form slot="table-search" slot-scope="props" :model="queryFormData" label-width="68px" inline
                     @submit.native.prevent size="mini">
                <el-form-item label="栏目名称" prop="name">
                    <el-input placeholder="请输入栏目名称" clearable v-model="queryFormData.name"
                              style="width:150px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" plain @click="queryCoumle">查询</el-button>
                    <el-button type="primary" plain @click="resetFormData">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table slot="table" class="background-table" :ref="tableRef" :data="page.list" height="100%"
                      @selection-change="selectionHandler" stripe>
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column type='index' label="序号" align="center"></el-table-column>
                <!--<el-table-column align="center" show-overflow-tooltip label="终端名称" prop="name">
                </el-table-column>-->
                <el-table-column align="center" show-overflow-tooltip label="栏目名称" prop="name"></el-table-column>
                <el-table-column align="center" show-overflow-tooltip label="创建时间"
                                 prop="createDatetime"></el-table-column>
                <el-table-column label="操作" align="center" width="215px">
                    <template slot-scope="props">
                        <el-button class="text-table-button" icon="el-icon-edit" @click="queryHanderTbale(props.row)">
                            修改
                        </el-button>
                        <el-button class="text-table-button" icon="el-icon-delete" @click="deleteHanderTbale(props.row)">删除
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>

            <el-pagination slot="page" background layout="total, prev, pager, next" :total="page.total"
                           :page-size="page.pageSize"
                           @current-change="pageNoToggleHandler"
                           @size-change="pageSizeToggleHandler"></el-pagination>
            <template>
<!--                <update :ref="dialogRef" @exchange="queryData"></update>-->
<!--                <edit ref="editTerminal" @exchange="queryCoumle"></edit>-->
<!--                <add ref="addTerminal" @exchange="queryLeftTree"></add>-->
            </template>

        </ListLayout>
    </LeftRightLayout>
</template>

<script>
    export default JBoot({
        components: {
            // update: require('./update').default,
            // edit: require('./edit').default,
            // add: require('./add').default,

        },

        props: {},

        data() {
            return {
                moduleName: 'file',
                listMethod: 'queryFileList',
                treelist:[]
            }
        },
        methods: {
            queryTable(){

            },

        },

        watch: {}
    }).store('otherInfo', 'userInfo').list().build();
</script>

<style lang="scss">
    .terminal-index-warp {
        .active {
            color: red;
        }

        .el-checkbox__inner {
            border: 1px solid #778899;
        }

        .activeCategory {
            background-color: #FEE8E7;
            color: #E50D02;
            font-weight: bold;
        }

        & .left-wrap {
            background-color: #FFFFFF;
            height: 100%;
            width: 100%;
            border-radius: 4px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);

            & > .title {
                color: #E50D02;
                font-size: 14px;
                font-weight: bold;
                padding: 10px 20px;
            }

            & > .tree-parent {
                height: calc(100% - 50px);
                overflow-y: auto;

                & > li {
                    /*.el-tree .el-tree-node > .el-tree-node__content{*/
                    /*    color: red;*/
                    /*}*/
                    & > .title {

                        padding-top: 11px;
                        padding-right: 0px;
                        padding-bottom: 10px;
                        padding-left: 20px;
                        background-color: #FBFBFB;
                        border-top: 1px solid #EEEEEE;
                        border-bottom: 1px solid #EEEEEE;
                        cursor: default;
                        user-select: none;
                        // white-space: nowrap;
                        display: flex;
                        text-overflow: ellipsis;
                        overflow: hidden;

                        & > img {
                            width: 16px;
                            height: 16px;
                            float: left;
                            margin-top: 1px;
                            margin-right: 5px;
                        }

                        & > span {
                            color: #656565;
                            font-size: 14px;
                            width: 180px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        & > i {
                            //margin-left: 160px;
                            position: absolute;
                            left: 252px;
                        }
                    }

                    &:last-child {
                        & > .title {
                            cursor: pointer;

                            &:hover > span {
                                color: #000000;
                            }
                        }
                    }

                    & > .el-tree {
                        padding-left: 30px;
                        .tree-div-title{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 170px;
                        }
                        & .el-tree-node {
                            &:focus > .el-tree-node__content {
                                background-color: #ffffff;
                            }

                            & > .el-tree-node__content {
                                font-size: 12px;
                                //color: red;
                                &:hover {
                                    background-color: #fff;
                                    //color: red;
                                }

                                & > .el-tree-node__expand-icon:not(.is-leaf) {
                                    color: #797777;
                                }

                                & > div > div {
                                    font-size: 12px;
                                }
                            }

                            &.is-current {
                                & > .el-tree-node__content {
                                    background-color: #ffffff;

                                    & > .el-tree-node__expand-icon:not(.is-leaf) {
                                        color: #F01F1B !important;
                                    }

                                    & > div > div {
                                        color: #F01F1B !important;
                                    }
                                }
                            }

                            & .el-tree-node {
                                & > .el-tree-node__content {
                                    & > div > div {
                                        color: #A8A8A8;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .resource-audit-upload-transcoding-list-wrap {
            .el-table th > .cell {
                color: #333333;
                opacity: 1;
            }

            a:link, a:visited {
                color: green;
                text-decoration: none;
            }

            a:hover, a:active {
                color: orangered;
                text-decoration: none;
            }
        }
    }
</style>

