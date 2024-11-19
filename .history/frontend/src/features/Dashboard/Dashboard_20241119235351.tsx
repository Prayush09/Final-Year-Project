// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Users, MessageSquare, Home, ArrowRight, Bell } from "lucide-react";
// import { useAuth } from "../../hooks/useAuth";
// import {
//   Alert,
//   AlertTitle,
//   AlertDescription,
// } from "@/components/ui/alert";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import MatchSuggestions from "./MatchSuggestions";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from 'axios';

// export default function Dashboard() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch Current Matches
//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/matches/");
//         const data = await response.json();
//         setMatches(data); // Assuming API returns an array of match objects
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, []);

//   return (
//     <div className="min-h-screen px-5 py-5">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
//             Welcome back, {user?.name?.split(" ")[0]}!
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">
//             Here's what's happening with your matches today.
//           </p>
//         </div>
//         <div className="flex items-center gap-4">
//           <Button
//             variant="outline"
//             size="icon"
//             className="relative border-purple-500 dark:border-purple-600 text-purple-600 dark:text-purple-300"
//           >
//             <Bell className="h-5 w-5" />
//             <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-500 dark:bg-purple-700 rounded-full flex items-center justify-center text-[10px] text-white">
//               3
//             </span>
//           </Button>
//           <Avatar className="h-12 w-12 border-2 border-purple-600">
//             <AvatarFallback className="bg-purple-600 text-white">
//               {user?.name?.charAt(0)}
//             </AvatarFallback>
//           </Avatar>
//         </div>
//       </div>

//       {/* Profile Completion Banner */}
//       {!user?.profile_completed && (
//         <Alert className="mb-8 border-l-4 border-purple-400 bg-purple-50 dark:bg-purple-900/20">
//           <AlertTitle className="text-purple-800 dark:text-purple-200 font-semibold flex items-center gap-2">
//             Profile Incomplete
//           </AlertTitle>
//           <AlertDescription className="text-purple-700 dark:text-purple-300">
//             Complete your profile to unlock personalized match suggestions.{" "}
//             <Button
//               variant="link"
//               className="text-purple-800 dark:text-purple-200 bg-transparent font-semibold hover:text-purple-900"
//               onClick={() => {
//                 navigate("/profile");
//               }}
//             >
//               Complete Now <ArrowRight className="h-4 w-4 ml-1 inline" />
//             </Button>
//           </AlertDescription>
//         </Alert>
//       )}

//       {/* Stats Grid */}
//       <div className="grid gap-6 md:grid-cols-3 mb-8">
//         {/* Card: Total Matches */}
//         <Card className="bg-white dark:bg-gray-800 hover:shadow-md transform transition-all hover:scale-105">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400">
//               Total Matches
//             </CardTitle>
//             <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
//               <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
//               {matches.length}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Current Matches Section */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
//         <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400">
//           Current Matches
//         </h2>
//         {loading ? (
//           <div className="text-center text-gray-500 dark:text-gray-400">
//             Loading matches...
//           </div>
//         ) : matches.length > 0 ? (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {matches.map((match) => (
//               <Card
//                 key={match.match_id}
//                 className="hover:shadow-lg transform transition-all hover:scale-105"
//               >
//                 <CardHeader className="flex items-center gap-4 pb-2">
//                   <Avatar className="h-12 w-12 border-2 border-purple-600">
//                     <AvatarImage src={match.avatar || ""} />
//                     <AvatarFallback className="bg-purple-600 text-white">
//                       {match.name?.charAt(0)}
//                     </AvatarFallback>
//                   </Avatar>
//                   <CardTitle className="text-lg font-bold text-purple-700 dark:text-purple-400">
//                     {match.name}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">
//                     {match.bio || "No bio available"}
//                   </p>
//                   <Badge
//                     variant="secondary"
//                     className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 mt-2"
//                   >
//                     {match.match_score}% Match
//                   </Badge>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 dark:text-gray-400">
//             You currently have no matches. Keep exploring!
//           </p>
//         )}
//       </div>

//       {/* Match Suggestions Section */}
//       {user?.profile_completed && (
//         <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
//           <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400">
//             Your Match Suggestions
//           </h2>
//           <MatchSuggestions />
//         </div>
//       )}
//     </div>
//   );
// }
