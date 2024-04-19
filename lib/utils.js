import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function formatDate(date) {
	const currentDate = new Date();
	const noteDate = new Date(date);

	const diffTime = Math.abs(currentDate - noteDate);
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
	const diffMinutes = Math.floor(diffTime / (1000 * 60));

	if (diffDays === 0) {
		if (diffHours === 0) {
			if (diffMinutes === 0) {
				return "just now";
			} else {
				return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
			}
		} else {
			return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
		}
	} else if (diffDays === 1) {
		return "yesterday";
	} else {
		return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
	}
}


export function applyStatusColor(status) {
	switch (status) {
	  case 'NEW':
		return "bg-purple-50"; // Adjust as needed
	  case 'IN_PROGRESS':
		return 'bg-blue-50'; // Adjust as needed
	  case 'RESOLVED':
		return 'bg-green-50'; // Adjust as needed
	  case 'CLOSED':
		return 'bg-slate-50'; // Adjust as needed
	  default:
		return ''; // Default background color or handle undefined status
	}
  }