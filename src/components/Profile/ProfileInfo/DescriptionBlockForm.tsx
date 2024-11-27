import React from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {validationSchema} from './schema'
import {ProfileType} from '../../../types'
import {Button, Checkbox, Descriptions, Input} from 'antd'
import styles from './ProfileInfo.module.css'

type DescriptionBlockFormProps = {
	profile: ProfileType;
	onSubmit: (values: ProfileType) => void;
	onCancel: () => void;
};

export const DescriptionBlockForm: React.FC<DescriptionBlockFormProps> = ({
	profile,
	onSubmit,
	onCancel
}) => {
	return (
		<Formik
			initialValues={{
				fullName: profile.fullName || '',
				lookingForAJob: profile.lookingForAJob || false,
				lookingForAJobDescription: profile.lookingForAJobDescription || '',
				aboutMe: profile.aboutMe || '',
				contacts: profile.contacts || {}
			}}
			validationSchema={validationSchema}
			onSubmit={(values, {setSubmitting}) => {
				const updatedProfile: ProfileType = {
					...profile,
					...values
				}
				onSubmit(updatedProfile)
				setSubmitting(false)
			}}
		>
			{({values, isSubmitting}) => (
				<Form>
					<Descriptions bordered title="" layout="horizontal" column={1}>
						<Descriptions.Item label="Full Name">
							<Field name="fullName">
								{({field}: any) => (
									<Input
										{...field}
										placeholder="Enter full name"
										status={field.error ? 'error' : ''}
									/>
								)}
							</Field>
							<ErrorMessage name="fullName">
								{(msg) => <div style={{color: 'red'}}>{msg}</div>}
							</ErrorMessage>
						</Descriptions.Item>

						<Descriptions.Item label="Looking for a job">
							<Field name="lookingForAJob" type="checkbox">
								{({field}: any) => (
									<Checkbox {...field} checked={values.lookingForAJob}>
										Yes
									</Checkbox>
								)}
							</Field>
						</Descriptions.Item>

						{values.lookingForAJob && (
							<Descriptions.Item label="My Professional Skills">
								<Field name="lookingForAJobDescription">
									{({field}: any) => (
										<Input.TextArea
											{...field}
											placeholder="Describe your professional skills"
											rows={3}
										/>
									)}
								</Field>
								<ErrorMessage name="lookingForAJobDescription" component="div"/>
							</Descriptions.Item>
						)}

						<Descriptions.Item label="About Me">
							<Field name="aboutMe">
								{({field}: any) => (
									<Input.TextArea
										{...field}
										placeholder="Tell about yourself"
										rows={3}
									/>
								)}
							</Field>
							<ErrorMessage name="aboutMe" component="div"/>
						</Descriptions.Item>

						<Descriptions.Item label="Contacts">
							{Object.keys(profile.contacts || {}).map((key) => (
								<div key={key} className={styles.contactField}>
									<b>{key}:</b>
									<Field name={`contacts.${key}`}>
										{({field}: any) => (
											<Input {...field} placeholder={`Enter ${key}`}/>
										)}
									</Field>
									<ErrorMessage name={`contacts.${key}`} component="div"/>
								</div>
							))}
						</Descriptions.Item>
					</Descriptions>

					<div className={styles.formButtons}>
						<Button type="primary" htmlType="submit" loading={isSubmitting}>
							Save
						</Button>
						<Button htmlType="button" onClick={onCancel} style={{marginLeft: '10px'}}>
							Cancel
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	)
}
