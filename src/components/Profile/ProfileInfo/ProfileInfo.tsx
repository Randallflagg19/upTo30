import React, {ChangeEvent} from 'react'
import {Descriptions} from 'antd'
import styles from './ProfileInfo.module.css'
import defaultAvatar from '../../../assets/defaultAvatar.png'
import {ContactsType, ProfileType} from '../../../types'
import ProfileStatus from '../ProfileStatus'
import {useDispatch, useSelector} from 'react-redux'
import {savePhotoThunk} from '../../../store/profileSlice'
import {AppDispatch} from '../../../store/store'

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

	return (
		<div className={styles.profileContainer}>
			<div>
				<img
					className={styles.avatar}
					src={profile.photos?.large || profile.photos?.small || defaultAvatar}
					alt="Profile"
				/>
				{isOwnProfile && <input type="file" onChange={onPhotoSelected}/>}
			</div>
			<ProfileStatus userId={userId} isOwnProfile={isOwnProfile}/>
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
		</div>
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
