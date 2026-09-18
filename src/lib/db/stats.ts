import { prisma } from "@/lib/prisma";

const THIRTY_DAYS_AGO = () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

export type AdminStats = {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalSales: number;
  totalProducts: number;
  activeProducts: number;
  totalBrands: number;
  activeBrands: number;
  totalBlogs: number;
  publishedBlogs: number;
  galleryImages: number;
  activeGallery: number;
};

export async function getAdminStats(): Promise<AdminStats> {
  const [
    totalUsers,
    activeUsers,
    totalOrders,
    pendingOrders,
    deliveredOrders,
    salesAgg,
    totalProducts,
    activeProducts,
    totalBrands,
    activeBrands,
    totalBlogs,
    publishedBlogs,
    galleryImages,
    activeGallery,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        active: true,
        OR: [
          { lastLoginAt: { gte: THIRTY_DAYS_AGO() } },
          { createdAt: { gte: THIRTY_DAYS_AGO() } },
        ],
      },
    }),
    prisma.order.count(),
    prisma.order.count({
      where: { status: { in: ["placed", "confirmed", "out_for_delivery"] } },
    }),
    prisma.order.count({ where: { status: "delivered" } }),
    prisma.order.aggregate({
      where: {
        OR: [
          { paymentStatus: "paid" },
          { status: "delivered" },
        ],
      },
      _sum: { totalAmount: true },
    }),
    prisma.product.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.brand.count(),
    prisma.brand.count({ where: { active: true } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.galleryItem.count(),
    prisma.galleryItem.count({ where: { active: true } }),
  ]);

  return {
    totalUsers,
    activeUsers,
    totalOrders,
    pendingOrders,
    deliveredOrders,
    totalSales: salesAgg._sum.totalAmount ?? 0,
    totalProducts,
    activeProducts,
    totalBrands,
    activeBrands,
    totalBlogs,
    publishedBlogs,
    galleryImages,
    activeGallery,
  };
}
