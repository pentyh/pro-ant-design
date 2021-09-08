import React from 'react';
import {useIntl, FormattedMessage, useParams} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import ProForm, {
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormDateTimePicker, ProFormTimePicker, ProFormGroup, ProFormDatePicker,
} from '@ant-design/pro-form';

import styles from './index.less';
import {Button} from "antd";
import moment from "moment";

const Index: React.FC = () => {
    const intl = useIntl();
    const uid = useParams<{ uid?: any }>()

    console.log('useParams', {uid});

    return (

        <PageContainer>
            <ProForm
                className={styles.form}
                // initialValues={{
                //     name: 'initialName',
                //     target: 'chapter',
                // }}
                params={{uid}}
                request={async (params, props) => {

                    console.log('request', {params, props});
                    const data = {
                        name: 'request Name',
                        target: 'chapter',
                        date: '20200202',
                        starttime: '1000',
                        endtime: '1100',
                    }
                    return {
                        ...data,
                        time: [moment(data.starttime, 'HHmm'), moment(data.endtime, 'HHmm')]
                    };
                }}
                // omitNil={false}
                onInit={values => {

                    console.log('onInit', {values});
                }}
                onFinish={async formData => {
                    console.log('onFinish', {formData});
                    return true
                }}
            >
                <ProFormGroup label="ProFormGroupLabel" title="ProFormGroupTitle">
                    <ProFormText
                        name="name"
                        label={intl.formatMessage({
                            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
                            defaultMessage: '规则名称',
                        })}
                        width="md"
                        rules={[
                            {
                                required: true,
                                message: (
                                    <FormattedMessage
                                        id="pages.searchTable.updateForm.ruleName.nameRules"
                                        defaultMessage="请输入规则名称！"
                                    />
                                ),
                            },
                        ]}
                        addonAfter={<Button>addonAfter</Button>}
                    />
                    <ProFormSelect
                        name="target"
                        width="md"
                        label={intl.formatMessage({
                            id: 'pages.searchTable.updateForm.object',
                            defaultMessage: '监控对象',
                        })}
                        valueEnum={{
                            0: '表一',
                            1: '表二',
                        }}
                    />
                </ProFormGroup>

                <ProFormDatePicker
                    name="date"
                    label={intl.formatMessage({
                        id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',
                        defaultMessage: '开始时间',
                    })}
                    transform={(value, field, object) => {

                        console.log('transform', {value, field, object})
                        return {
                            date: moment(value).format('YYYYMMDD')
                        };
                    }}
                />
                <ProFormTimePicker.RangePicker
                    label={intl.formatMessage({
                        id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',
                        defaultMessage: '开始时间',
                    })}
                    name="time"
                    fieldProps={{
                        format: 'HH:mm',
                    }}
                    transform={(value, field, object) => {

                        console.log('transform', {value, field, object})
                        return {
                            starttime: moment(value[0], 'HH:mm').format('HHmm'),
                            endtime: moment(value[1], 'HH:mm').format('HHmm'),
                        };
                    }}
                />
                <ProFormTextArea
                    name="desc"
                    width="md"
                    label={intl.formatMessage({
                        id: 'pages.searchTable.updateForm.ruleDesc.descLabel',
                        defaultMessage: '规则描述',
                    })}
                    placeholder={intl.formatMessage({
                        id: 'pages.searchTable.updateForm.ruleDesc.descPlaceholder',
                        defaultMessage: '请输入至少五个字符',
                    })}
                />
            </ProForm>
        </PageContainer>

    );
};

export default Index;
