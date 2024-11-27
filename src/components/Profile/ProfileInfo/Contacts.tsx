import React from 'react'
import {ContactsType} from '../../../types'

type ContactsProps = {
	contacts: ContactsType;
};

export const Contacts: React.FC<ContactsProps> = ({contacts}) => {
	return (
		<div>
			{Object.entries(contacts).map(([key, value]) =>
				value ? (
					<div key={key}>
						<strong>{key}:</strong>{' '}
						<a href={value} target="_blank" rel="noopener noreferrer">
							{value}
						</a>
					</div>
				) : (
					<div key={key}>
						<strong>{key}:</strong> Not provided
					</div>
				)
			)}
		</div>
	)
}
