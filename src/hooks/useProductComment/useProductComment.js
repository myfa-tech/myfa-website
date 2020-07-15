import { useState } from 'react';

import getQueryParam from '../../utils/getQueryParam';
import { sendBasketCommentMail } from '../../services/mailjet';
import UserStorage from '../../services/UserStorage';

const useProductComment = (init = '') => {
  const [commentError, setCommentError] = useState(false);
  const [comment, setComment] = useState(init);
  const [isCommentSendingLoading, setIsCommentSendingLoading] = useState(false);
  const [isCommentSent, setIsCommentSent] = useState(false);

  const user = UserStorage.getUser();

  const handleCommentChange = (e) => {
    const { value } = e.target;

    setComment(value);
    setCommentError(false);
  };

  const getProductName = () => {
    if (typeof window !== 'undefined') {
      let name = window.location.pathname.split('products/')[1];

      return name;
    }
  };

  const sendComment = async () => {
    if (comment !== '') {
      setIsCommentSendingLoading(true);

      await sendBasketCommentMail({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        comment,
        basketType: getQueryParam('type') || getProductName(),
      });

      setComment('');
      setIsCommentSent(true);
      setIsCommentSendingLoading(false);
    } else {
      setCommentError(true);
    }
  };

  return { comment, commentError, isCommentSendingLoading, isCommentSent, handleCommentChange, sendComment };
};

export default useProductComment;
