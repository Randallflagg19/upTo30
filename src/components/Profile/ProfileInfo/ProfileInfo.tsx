import React from 'react'
import {Descriptions} from 'antd'
import styles from './ProfileInfo.module.css'
import defaultAvatar from '../../../assets/defaultAvatar.png'
import {ProfileType} from '../../../types'

type ProfileInfoProps = {
	profile: ProfileType;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({profile}) => {
	return (
		<div className={styles.profileContainer}>
			<div>
				<img
					className={styles.avatar}
					src={profile.photos?.large || profile.photos?.small || defaultAvatar}
					alt="Profile"
				/>
			</div>
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
					{Object.entries(profile.contacts).map(([key, value]) => (
						<div key={key}>
							<b>{key}:</b> {value || '-'}
						</div>
					))}
				</Descriptions.Item>
			</Descriptions>
		</div>
	)
}

export default ProfileInfo
