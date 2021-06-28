import ghostProfileImage from "../assets/images/default_profile_img_gray.png"

export function getProfileImageSrc(image) {
  return imageS3Src(image) !== "" ? imageS3Src(image) : ghostProfileImage
}

export function imageS3Src(image) {
  return image ? `https://s3.us-west-2.amazonaws.com/goalmogul-v1/${image}` : ""
}
