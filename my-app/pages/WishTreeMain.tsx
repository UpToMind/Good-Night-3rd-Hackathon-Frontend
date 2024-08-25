"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import WishFruit from "../components/WishFruit";
// import axios from 'axios';  // API 호출시 주석 해제

interface Wish {
  id: number;
  title: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  is_confirm: string;
}

interface PaginationInfo {
  limit: number;
  page: number;
  total: number;
}

// 가짜 데이터 생성 함수
const generateMockWishes = (
  page: number,
  limit: number,
  category: string
): Wish[] => {
  const categories = [
    "진로",
    "건강",
    "인간 관계",
    "돈",
    "목표",
    "학업/성적",
    "기타",
  ];
  return Array(limit)
    .fill(null)
    .map((_, index) => ({
      id: (page - 1) * limit + index + 1,
      title: `소원 ${(page - 1) * limit + index + 1}`,
      category:
        category === "전체"
          ? categories[Math.floor(Math.random() * categories.length)]
          : category,
      content: `소원 내용 ${(page - 1) * limit + index + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      is_confirm: "approved",
    }));
};

const WishTreePage: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [userRole, setUserRole] = useState<"User" | "Admin">("User");
  const [category, setCategory] = useState<string>("전체");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    limit: 9,
    page: 1,
    total: 100,
  });
  const observer = useRef<IntersectionObserver | null>(null);

  const categories = [
    "전체",
    "진로",
    "건강",
    "인간 관계",
    "돈",
    "목표",
    "학업/성적",
    "기타",
  ];

  const fetchWishes = useCallback(async () => {
    if (
      loading ||
      page > Math.ceil(paginationInfo.total / paginationInfo.limit)
    ) {
      return;
    }
    setLoading(true);

    // 가짜 데이터 사용
    const newWishes = generateMockWishes(page, paginationInfo.limit, category);
    setWishes((prev) => [...prev, ...newWishes]);
    setPage((prev) => prev + 1);
    setLoading(false);

    // API 호출 코드 (현재는 주석 처리)
    /*
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/wishes/approved`, {
        params: {
          page: page,
          limit: paginationInfo.limit,
          category: category !== '전체' ? category : undefined
        }
      });
      const newWishes = response.data.data;
      setWishes(prev => [...prev, ...newWishes]);
      setPaginationInfo(response.data.pagination);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Failed to fetch wishes:', error);
    } finally {
      setLoading(false);
    }
    */
  }, [page, category, loading, paginationInfo]);

  useEffect(() => {
    setWishes([]);
    setPage(1);
    fetchWishes();
  }, [category]);

  const lastWishElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchWishes();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, fetchWishes]
  );

  const toggleRole = () => {
    setUserRole((prev) => (prev === "User" ? "Admin" : "User"));
  };

  return (
    <div className="min-h-screen bg-tree-pattern bg-top bg-no-repeat relative">
      <Header rightText="소원 열매 달기" />
      <div className="container mx-auto p-4">
        <div className="flex justify-end items-center mb-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {wishes.map((wish, index) => (
            <Link href={`/wish/${wish.id}`} key={wish.id}>
              <div
                ref={index === wishes.length - 1 ? lastWishElementRef : null}
                className="p-4 rounded-lg flex justify-center items-center"
              >
                <WishFruit title={wish.title} />
              </div>
            </Link>
          ))}
        </div>
        {loading && <p className="text-center mt-4">Loading...</p>}
      </div>
      <div
        className="fixed bottom-4 right-4 w-12 h-12 cursor-pointer"
        onClick={toggleRole}
      >
        <Image
          src={userRole === "User" ? "/user.png" : "/admin.png"}
          alt={`Current role: ${userRole}`}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default WishTreePage;
