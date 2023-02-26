import axios from "axios";
import { Komment } from "types";

const sexy = true;
export async function getComments(slug: string) {
  if (sexy) {
    return await axios
      .get<Komment[]>(`/api/posts/${slug}`)
      .then((res) => res.data);
  }
}
type Body = {
  text: string;
  slug?: string;
  parentId?: string;
};

export async function addComment(x: Body): Promise<Body> {
  if (sexy) {
    return await axios
      .post<Body>(`/api/posts/${x.slug}`, x)
      .then((res) => res.data);
  }
}
