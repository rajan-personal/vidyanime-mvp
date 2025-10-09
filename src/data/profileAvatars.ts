import { getAssetPath } from "@/utils/paths";

const avatarPath = (filename: string) =>
  getAssetPath(`avatars/${encodeURIComponent(filename)}`);

export const defaultMaleAvatar = avatarPath("Ellipse 7.png");
export const defaultFemaleAvatar = avatarPath("Ellipse 11.png");

export const profileAvatarByName: Record<string, string> = {
  "Mrs. Pooja Tripathi": avatarPath("Ellipse 7.png"),
  "Mr. Ajay Singh": avatarPath("Ellipse 11.png"),
  "Ms. Priyanka Subramaniam": avatarPath("Ellipse 13.png"),
  "Mrs. Sushmita Kapoor": avatarPath("Ellipse 9.png"),
  "Mr. Aniket Kashyap": avatarPath("Ellipse 12.png"),
  "Mr. Manish Sahu": avatarPath("Ellipse 8.png"),
  "Ms. Kangana Rathod": avatarPath("Ellipse 15.png"),
  "Ms. Lavanya Rameshwar": avatarPath("Ellipse 10.png"),
  "Ms. Urmila Oberoi": avatarPath("Ellipse 14.png"),
};

export const getAvatarForName = (
  name: string,
  gender: "male" | "female" = "male",
): string => {
  if (profileAvatarByName[name]) {
    return profileAvatarByName[name];
  }

  return gender === "female" ? defaultFemaleAvatar : defaultMaleAvatar;
};
