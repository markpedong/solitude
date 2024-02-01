import classNames from 'classnames'
import React, { FC } from 'react'
import styles from '../styles.module.scss'
// import { ModalForm, ProForm, ProFormCheckbox, ProFormSelect, ProFormText } from '@ant-design/pro-components'
// import { MODAL_FORM_PROPS } from '@/constants'
import { Jost } from 'next/font/google'

const jost = Jost({ weight: '400', subsets: ['latin'] })

const Address: FC = () => {
    // const renderEditAddress = () => {
    //     return (
    //         <ModalForm
    //             {...MODAL_FORM_PROPS}
    //             width={600}
    //             grid
    //             title={<span className={jost.className}>Edit Address</span>}
    //             trigger={<span>Edit</span>}>
    //             <ProForm.Group>
    //                 <ProFormText label="Full Name" name="name" placeholder="Full Name" colProps={{ span: 12 }} />
    //                 <ProFormText
    //                     label="Phone Number"
    //                     name="number"
    //                     placeholder="Phone Number"
    //                     colProps={{ span: 12 }}
    //                 />
    //             </ProForm.Group>
    //             <ProFormSelect
    //                 label="Region, Province, City, Barangay"
    //                 name="address1"
    //                 placeholder="Region, Province, City, Barangay"
    //             />
    //             <ProFormText label="Postal Code" name="postal" placeholder="Postal Code" />
    //             <ProFormText
    //                 label="Street Name, Building, House No."
    //                 name="address2"
    //                 placeholder="Street Name, Building, House No."
    //             />
    //             <ProFormCheckbox.Group
    //                 name="label_as"
    //                 layout="horizontal"
    //                 label="Label As:"
    //                 options={['Home', 'Work']}
    //             />
    //             <ProFormCheckbox.Group
    //                 name="check_address"
    //                 options={['Set as Default Address', 'Set as Pickup Address', 'Set as Return Address']}
    //             />
    //         </ModalForm>
    //     )
    // }
    return (
        <div>
            <span className={classNames(jost.className, styles.profileHeader)}>Address</span>
            {/* {new Array(5).fill('').map(() => (
                <Flex
                    className={classNames(jost.className, styles.addressContainer)}
                    justify="space-between"
                    align="center">
                    <div>
                        <div>
                            <span>Mark</span> | <span>(+63) 9760588324</span>
                        </div>
                        <div>GG, Blk 4 Lot 1 corner Coral Way St, Diosdado Macapagal Blvd, Pasay</div>
                        <div>Barangay 78, Pasay City, Metro Manila, Metro Manila, 1709</div>
                        <div>
                            <span>Default</span>
                            <span>Pickup Address</span>
                            <span>Return Address</span>
                        </div>
                    </div>
                    <div className={styles.addressOperators}>
                        {renderEditAddress()}
                        <span>Delete</span>
                        <span>Set as Default</span>
                    </div>
                </Flex>
            ))} */}
        </div>
    )
}

export default Address
