import React, {ChangeEvent, useState} from 'react'
import {Button, Checkbox, Descriptions, Input} from 'antd'
import styles from './ProfileInfo.module.css'
import defaultAvatar from '../../../assets/defaultAvatar.png'
import {ContactsType, ProfileType} from '../../../types'
import ProfileStatus from '../ProfileStatus'
import {useDispatch} from 'react-redux'
import {savePhotoThunk} from '../../../store/profileSlice'
import {AppDispatch} from '../../../store/store'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'

type ProfileInfoProps = {
	profile: ProfileType;
	userId: string;
	isOwnProfile: boolean
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({profile, userId, isOwnProfile}) => {
	const dispatch = useDispatch<AppDispatch>()
	const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			dispatch(savePhotoThunk(file))
		}
	}
	const handleSave = (values: ProfileType) => {
		console.log('Saved values:', values)
		// Здесь можно вызвать thunk для сохранения данных профиля
		setEditMode(false)
	}
	const [editMode, setEditMode] = useState(false)
	return (
		<div className={styles.profileContainer}>
			<div>
				<img
					className={styles.avatar}
					src={profile.photos?.large || profile.photos?.small || defaultAvatar}
					alt="Avatar"/>
				{isOwnProfile && <input type="file" onChange={onPhotoSelected}/>}
			</div>
			<ProfileStatus userId={userId} isOwnProfile={isOwnProfile}/>
			{isOwnProfile && <button onClick={() => setEditMode(true)}>✏️</button>}
			{editMode ? <DescriptionBlockForm
					profile={profile}
					onSubmit={handleSave}
					onCancel={() => setEditMode(false)}
				/> :
				<DescriptionBlock profile={profile}/>}
		</div>
	)
}

type DescriptionProps = {
	profile: ProfileType;
};

const DescriptionBlock: React.FC<DescriptionProps> = ({profile}) => {
	return (
		<Descriptions bordered title="" layout="horizontal" column={1}>
			<Descriptions.Item label="Full Name">{profile.fullName}</Descriptions.Item>
			<Descriptions.Item label="Looking for a job">
				{profile.lookingForAJob ? 'Yes' : 'No'}
			</Descriptions.Item>
			{profile.lookingForAJob && (
				<Descriptions.Item label="My Professional Skills">
					{profile.lookingForAJobDescription || '-'}
				</Descriptions.Item>
			)}
			<Descriptions.Item label="About Me">{profile.aboutMe || '-'}</Descriptions.Item>

			<Descriptions.Item label="Contacts">
				<Contacts contacts={profile.contacts}/>
			</Descriptions.Item>
		</Descriptions>
	)
}

// const DescriptionBlockForm: React.FC<DescriptionProps> = ({profile}) => {
// 	return (
// 		<Descriptions bordered title="" layout="horizontal" column={1}>
// 			<Descriptions.Item label="Full Name">{profile.fullName}</Descriptions.Item>
// 			<Descriptions.Item label="Looking for a job">
// 				{profile.lookingForAJob ? 'Yes' : 'No'}
// 			</Descriptions.Item>
// 			{profile.lookingForAJob && (
// 				<Descriptions.Item label="My Professional Skills">
// 					{profile.lookingForAJobDescription || '-'}
// 				</Descriptions.Item>
// 			)}
// 			<Descriptions.Item label="About Me">{profile.aboutMe || '-'}</Descriptions.Item>
//
// 			<Descriptions.Item label="Contacts">
// 				<Contacts contacts={profile.contacts}/>
// 			</Descriptions.Item>
// 		</Descriptions>
// 	)
// }

const validationSchema = Yup.object({
	fullName: Yup.string().required('Full name is required'),
	lookingForAJob: Yup.boolean(),
	lookingForAJobDescription: Yup.string().when('lookingForAJob', (lookingForAJob, schema) =>
		lookingForAJob ? schema.required('Please provide your professional skills') : schema
	),
	aboutMe: Yup.string().required('Please tell us about yourself'),
	contacts: Yup.object().shape({
		facebook: Yup.string().url('Invalid URL for Facebook').nullable(),
		website: Yup.string().url('Invalid URL for Website').nullable(),
		vk: Yup.string().url('Invalid URL for VK').nullable(),
		twitter: Yup.string().url('Invalid URL for Twitter').nullable(),
		instagram: Yup.string().url('Invalid URL for Instagram').nullable(),
		youtube: Yup.string().url('Invalid URL for YouTube').nullable(),
		github: Yup.string().url('Invalid URL for GitHub').nullable(),
		mainLink: Yup.string().url('Invalid URL for Main Link').nullable()
	}).nullable() // This makes the entire 'contacts' object optional
})

type DescriptionBlockFormProps = {
	profile: ProfileType;
	onSubmit: (values: ProfileType) => void;
	onCancel: () => void;
};

const DescriptionBlockForm: React.FC<DescriptionBlockFormProps> = ({profile, onSubmit, onCancel}) => {
	return (
		<Formik
			initialValues={{
				fullName: profile.fullName || '',
				lookingForAJob: profile.lookingForAJob || false,
				lookingForAJobDescription: profile.lookingForAJobDescription || '',
				aboutMe: profile.aboutMe || '',
				contacts: profile.contacts || {} // Добавляем контакты в начальные значения
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
								{msg => <div style={{color: 'red'}}>{msg}</div>}
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
								<ErrorMessage
									name="lookingForAJobDescription"
									component="div"
									className="error-message"
								/>
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
							<ErrorMessage
								name="aboutMe"
								component="div"
								className="error-message"
							/>
						</Descriptions.Item>

						<Descriptions.Item label="Contacts">
							{/* Генерация полей для каждого контакта */}
							{Object.keys(profile.contacts || {}).map(key => (
								<div key={key} className={styles.contactField}>
									<b>{key}:</b>
									<Field name={`contacts.${key}`}>
										{({field}: any) => (
											<Input
												{...field}
												placeholder={`Enter ${key}`}
											/>
										)}
									</Field>
									<ErrorMessage
										name={`contacts.${key}`}
										component="div"
										className="error-message"
									/>
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

type ContactsProps = {
	contacts: ContactsType;
};
const Contacts: React.FC<ContactsProps> = ({contacts}) => {
	return (
		<div>
			{Object.entries(contacts).map(([key, value]) => (
				<div key={key}>
					<b>{key}:</b> {value || '-'}
				</div>
			))}
		</div>
	)
}

export default ProfileInfo
