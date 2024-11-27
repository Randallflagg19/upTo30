import React, {ChangeEvent, useState} from 'react'
import {Button, Descriptions} from 'antd'
import styles from './ProfileInfo.module.css'
import defaultAvatar from '../../../assets/defaultAvatar.png'
import {ProfileType} from '../../../types'
import ProfileStatus from '../ProfileStatus'
import {useDispatch} from 'react-redux'
import {savePhotoThunk, saveProfileDescriptionThunk} from '../../../store/profileSlice'
import {AppDispatch} from '../../../store/store'
import {Contacts} from './Contacts'
import {DescriptionBlockForm} from './DescriptionBlockForm'

type ProfileInfoProps = {
	profile: ProfileType;
	userId: string;
	isOwnProfile: boolean;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({profile, userId, isOwnProfile}) => {
	const dispatch = useDispatch<AppDispatch>()
	const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			dispatch(savePhotoThunk(file))
		}
	}

	return (
		<div className={styles.profileContainer}>
			<div>
				<img
					className={styles.avatar}
					src={profile.photos?.large || profile.photos?.small || defaultAvatar}
					alt="Avatar"
				/>
				{isOwnProfile && <input type="file" onChange={onPhotoSelected}/>}
			</div>
			<ProfileStatus userId={userId} isOwnProfile={isOwnProfile}/>
			<DescriptionBlock profile={profile} isOwnProfile={isOwnProfile}/>
		</div>
	)
}

type DescriptionProps = {
	profile: ProfileType;
	isOwnProfile: boolean;
};

const DescriptionBlock: React.FC<DescriptionProps> = ({profile, isOwnProfile}) => {
	const [editMode, setEditMode] = useState(false)
	const dispatch = useDispatch<AppDispatch>()
	return editMode ? (
		<DescriptionBlockForm
			profile={profile}
			onSubmit={(values) => {

				dispatch(saveProfileDescriptionThunk(values))
				console.log('Saved values:', values)
				setEditMode(false)
			}}
			onCancel={() => setEditMode(false)}
		/>
	) : (
		<>
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
			{isOwnProfile && (
				<Button onClick={() => setEditMode(true)} type="primary" style={{marginTop: '10px'}}>
					✏️ Edit
				</Button>
			)}
		</>
	)
}

export default ProfileInfo
