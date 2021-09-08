import {PlusOutlined} from '@ant-design/icons';
import {Button, Input} from 'antd';
import React, {useState, useRef} from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {rule} from '@/services/ant-design-pro/api';
import {Link} from "@umijs/preset-dumi/lib/theme";

const Index: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: (
                <FormattedMessage
                    id="pages.searchTable.updateForm.ruleName.nameLabel"
                    defaultMessage="Rule name"
                />
            ),
            dataIndex: 'name',
            tip: 'The rule name is the unique key',
            render: (dom, entity) => {
                return (
                    <Link to={{pathname: `/meeting/${entity.key}`}}>{dom}</Link>
                    // <a
                    //     onClick={() => {
                    //         setCurrentRow(entity);
                    //         setShowDetail(true);
                    //     }}
                    // >
                    //     {dom}
                    // </a>
                );
            },
        },
        {
            title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Description"/>,
            dataIndex: 'desc',
            valueType: 'textarea',
        },
        {
            title: (
                <FormattedMessage
                    id="pages.searchTable.titleCallNo"
                    defaultMessage="Number of service calls"
                />
            ),
            dataIndex: 'callNo',
            sorter: true,
            hideInForm: true,
            renderText: (val: string) =>
                `${val}${intl.formatMessage({
                    id: 'pages.searchTable.tenThousand',
                    defaultMessage: ' 万 ',
                })}`,
        },
        {
            title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status"/>,
            dataIndex: 'status',
            hideInForm: true,
            valueEnum: {
                0: {
                    text: (
                        <FormattedMessage
                            id="pages.searchTable.nameStatus.default"
                            defaultMessage="Shut down"
                        />
                    ),
                    status: 'Default',
                },
                1: {
                    text: (
                        <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Running"/>
                    ),
                    status: 'Processing',
                },
                2: {
                    text: (
                        <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="Online"/>
                    ),
                    status: 'Success',
                },
                3: {
                    text: (
                        <FormattedMessage
                            id="pages.searchTable.nameStatus.abnormal"
                            defaultMessage="Abnormal"
                        />
                    ),
                    status: 'Error',
                },
            },
        },
        {
            title: (
                <FormattedMessage
                    id="pages.searchTable.titleUpdatedAt"
                    defaultMessage="Last scheduled time"
                />
            ),
            sorter: true,
            dataIndex: 'updatedAt',
            valueType: 'dateTime',
            renderFormItem: (item, {defaultRender, ...rest}, form) => {
                const status = form.getFieldValue('status');
                if (`${status}` === '0') {
                    return false;
                }
                if (`${status}` === '3') {
                    return (
                        <Input
                            {...rest}
                            placeholder={intl.formatMessage({
                                id: 'pages.searchTable.exception',
                                defaultMessage: 'Please enter the reason for the exception!',
                            })}
                        />
                    );
                }
                return defaultRender(item);
            },
        },
        {
            title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating"/>,
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                    }}
                >
                    <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration"/>
                </a>,
                <a key="subscribeAlert" href="https://procomponents.ant.design/">
                    <FormattedMessage
                        id="pages.searchTable.subscribeAlert"
                        defaultMessage="Subscribe to alerts"
                    />
                </a>,
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle={intl.formatMessage({
                    id: 'pages.searchTable.title',
                    defaultMessage: 'Enquiry form',
                })}
                actionRef={actionRef}
                rowKey="key"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Link to={{pathname: `/meeting/new`}}>
                        <PlusOutlined/>
                        <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
                    </Link>
                    // <Button
                    //     type="primary"
                    //     key="primary"
                    //     onClick={() => {
                    //         handleModalVisible(true);
                    //     }}
                    // >
                    //     <PlusOutlined/> <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
                    // </Button>,
                ]}
                request={rule}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen"/>{' '}
                            <a style={{fontWeight: 600}}>{selectedRowsState.length}</a>{' '}
                            <FormattedMessage id="pages.searchTable.item" defaultMessage="项"/>
                            &nbsp;&nbsp;
                            <span>
                <FormattedMessage id="pages.searchTable.totalServiceCalls"
                                  defaultMessage="Total number of service calls"/>{' '}
                                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万"/>
              </span>
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            // await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        <FormattedMessage
                            id="pages.searchTable.batchDeletion"
                            defaultMessage="Batch deletion"
                        />
                    </Button>
                    <Button type="primary">
                        <FormattedMessage
                            id="pages.searchTable.batchApproval"
                            defaultMessage="Batch approval"
                        />
                    </Button>
                </FooterToolbar>
            )}

        </PageContainer>
    );
};

export default Index;
