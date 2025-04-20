// CategoryAccordion.tsx
import AddToCartButton from "@/app/product/[id]/components/AddToCartButton";
import { useGetProductsByCategoryQuery } from "@/services/productsApi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CategoryAccordionProps {
  category: string;
  expanded: boolean;
  onChange: (category: string) => void;
}

const CategoryAccordion = ({
  category,
  expanded,
  onChange,
}: CategoryAccordionProps) => {
  const router = useRouter();

  // Only fetch if expanded to avoid unnecessary requests
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetProductsByCategoryQuery(category, { skip: !expanded });

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={() => onChange(category)}
      sx={{ mb: 2 }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{category}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography color="error">
            Failed to load products for {category}. Please try again later.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 2,
                      bgcolor: "background.paper",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.title}
                      sx={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 0, m: 0 }}>
                    <Box sx={{ p: 1.5, m: 0 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        noWrap
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        textAlign={"center"}
                      >
                        ${product.price}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2,
                        flexDirection: { xs: "column", sm: "row" },
                        width: "100%",
                        alignItems: "stretch",
                        height: { xs: "auto", sm: "40px" },
                        justifyContent: "center",
                        // px: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: "93%", sm: "43%" },
                          height: "100%",
                          alignSelf: "center",
                          // px: { xs: 2, sm: 1 }, // Padding for smaller screens
                        }}
                      >
                        <AddToCartButton product={product} />
                      </Box>

                      <Box
                        sx={{
                          width: { xs: "93%", sm: "43%" },
                          height: "100%",
                          alignSelf: "center",

                          // px: { xs: 2, sm: 1 }, // Padding for smaller screens
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          component={Link}
                          href={`/product/${product.id}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            minHeight: { xs: "36px", sm: "40px" },
                            fontSize: {
                              xs: "0.75rem",
                              sm: "0.75rem",
                              md: "0.875rem",
                            },
                            py: 1, // Padding for button content
                            whiteSpace: "nowrap",
                          }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryAccordion;
